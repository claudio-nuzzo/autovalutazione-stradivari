import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {Miniflare, Log, LogLevel, convertV4MiniflareOptions} from 'miniflare';

// Run the actual production module in workerd with the exact compatibility date.
// ALL outbound traffic terminates in a local fixture, including redirect traps:
// no school record, live authentication, network upload or new binding in prod.
const owner='synthetic.teacher@istitutostradivari.it',token='synthetic-id-token';
const bytes=Buffer.from('%PDF-synthetic-archived-exact-bytes');
const sha=value=>createHash('sha256').update(value).digest('hex');
const uuid='acbc0191-a0ba-47ee-9828-4ace88ded460';
const payload={tipo:'attestato-digcomp',titolo:'Attestazione di autoformazione Metodo di insegnamento e DigComp 3.0',classe:'',materia:'Autoformazione docente',filename:'Autoformazione-DigComp-2026-27-'+uuid+'.pdf',mime:'application/pdf',size:bytes.length,base64:bytes.toString('base64'),request_id:uuid,anno_scolastico:'2026/27'};
payload.fingerprint=sha(JSON.stringify([owner,payload.tipo,payload.titolo,payload.classe,payload.materia,payload.filename,payload.mime,payload.size,sha(bytes)]));
const auth='https://accesso.stradilab.org/v1/profile',central='https://anagrafica.stradilab.org';
const target={auth,upload:central+'/carica-file',metadata:central+'/consegne/9',file:central+'/consegne/9/file'};
const root=fileURLToPath(new URL('../',import.meta.url));

// Test-only observation checks fetch options *inside workerd*, before actual
// native fetch. A followed-success fixture obtains a genuine redirected Response
// from two synthetic outbound responses, deliberately without any credentials.
const entry=`import worker from './worker.js';
const nativeFetch=globalThis.fetch;
export default {async fetch(request,env){
 let checked=0;
 globalThis.fetch=async(input,options)=>{
  if(options?.redirect!=='manual')throw Error('ExpectedManualRedirect');
  checked++;
  const response=await nativeFetch(input,options);
  if(response.headers.get('X-Fixture-Followed')==='1'){
   const followed=await nativeFetch('https://followed.invalid/start',{redirect:'follow'});
   if(followed.redirected!==true)throw Error('ExpectedActuallyFollowedResponse');
   return followed;
  }
  return response;
 };
 try {const result=await worker.fetch(request,env);const response=new Response(result.body,result);response.headers.set('X-Fixture-Manual-Calls',String(checked));return response;}
 finally {globalThis.fetch=nativeFetch;}
}};`;

async function fixture(run){
  let failure=null,calls=[],sent=[];
  const mf=new Miniflare(convertV4MiniflareOptions({
    modules:[{type:'ESModule',path:root+'tests/workerd-entry.js',contents:entry.replace("'./worker.js'","'../worker.js'")},{type:'ESModule',path:root+'worker.js'}],
    modulesRoot:root,compatibilityDate:'2026-09-11',log:new Log(LogLevel.ERROR),
    serviceBindings:{ASSETS:()=>new Response('synthetic-static')},
    outboundService:async request=>{
      const url=request.url;calls.push(url);
      // Any unexpected destination is rejected, never forwarded to the network.
      if(url.startsWith('https://followed.invalid/')){
        assert.equal(request.headers.get('Authorization'),null);
        assert.equal(await request.text(),'');
        if(url.endsWith('/start'))return new Response(null,{status:302,headers:{Location:'https://followed.invalid/end'}});
        // Valid success for the exact hop: rejection cannot accidentally pass
        // because a profile, record or PDF fixture has the wrong shape/MIME.
        if(failure.url===auth)return Response.json({ok:true,email:owner,isDocente:true});
        if(failure.url===target.file)return new Response(bytes,{headers:{'Content-Type':'application/pdf'}});
        if(failure.url===target.metadata)return Response.json({ok:true,consegna:{id:9,email:owner,tipo:'attestato-digcomp'}});
        return Response.json({ok:true,id:9});
      }
      assert.ok(Object.values(target).includes(url),'no redirect destination can receive a token');
      if(url===auth){assert.equal(request.method,'POST');assert.equal(JSON.parse(await request.text()).idToken,token);}
      else {
        assert.equal(request.headers.get('Authorization'),'Bearer '+token);
        if(url===target.upload){const body=await request.text();sent.push(body);assert.deepEqual(JSON.parse(body),payload);}
      }
      if(failure?.url===url){
        if(failure.followed)return new Response(null,{headers:{'X-Fixture-Followed':'1'}});
        return new Response(null,{status:failure.status,headers:{Location:'https://untrusted.invalid/receive'}});
      }
      if(url===auth)return Response.json({ok:true,email:owner,isDocente:true});
      if(url===target.upload)return Response.json({ok:true,id:9,url:'private-url-never-returned'});
      if(url===target.metadata)return Response.json({ok:true,consegna:{id:9,email:owner,tipo:'attestato-digcomp'}});
      return new Response(bytes,{headers:{'Content-Type':'application/pdf'}});
    }
  }));
  const send=async(stage,denial)=>{
    calls=[];failure=denial?{url:target[stage],...denial}:null;
    const upload=stage==='auth'||stage==='upload';
    const response=await mf.dispatchFetch('https://synthetic.invalid/api/archive/'+(upload?'upload':'records/9/file'),{
      method:upload?'POST':'GET',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:upload?JSON.stringify(payload):undefined
    });
    return {response,calls:[...calls],sent:[...sent]};
  };
  try{await run({mf,send});}finally{await mf.dispose();}
}

test('actual workerd accepts authenticated synthetic upload and exact private bytes; retry UUID/payload unchanged',async()=>{
  await fixture(async({mf,send})=>{
    const denied=await send('upload',{status:503});assert.equal(denied.response.status,503);
    const upload=await send('upload');assert.equal(upload.response.status,200);
    assert.deepEqual(await upload.response.json(),{ok:true,id:9});
    assert.equal(upload.response.headers.get('X-Fixture-Manual-Calls'),'2');
    assert.equal(new Set(upload.sent).size,1);assert.equal(upload.sent.length,2);
    const download=await send('file');assert.equal(download.response.status,200);
    assert.deepEqual(Buffer.from(await download.response.arrayBuffer()),bytes);
    assert.equal(download.response.headers.get('X-Fixture-Manual-Calls'),'3');
    assert.equal(download.response.headers.get('Cache-Control'),'private, no-store');
    assert.equal(download.response.headers.get('X-Content-Type-Options'),'nosniff');
    assert.equal((await mf.dispatchFetch('https://synthetic.invalid/')).status,200);
    assert.equal((await mf.dispatchFetch('https://synthetic.invalid/api/archive/records/9/file')).status,401);
  });
});

for(const stage of ['auth','upload','metadata','file']){
  test('actual workerd '+stage+' rejects ALL 300–399, genuinely followed 200 and non-ok without JWT following',async()=>{
    await fixture(async({send})=>{
      const failures=[...Array.from({length:100},(_,i)=>({status:300+i})),{followed:true},{status:403},{status:503}];
      for(const failure of failures){
        const {response,calls}=await send(stage,failure);
        assert.equal(response.status,stage==='auth'?401:failure.followed||failure.status<400?502:failure.status,stage+' '+JSON.stringify(failure));
        assert.equal(response.headers.get('Location'),null);assert.equal(response.headers.get('Cache-Control'),'private, no-store');
        assert.equal(response.headers.get('X-Fixture-Manual-Calls'),stage==='auth'?'1':stage==='file'?'3':'2');
        const expected=[auth];if(stage!=='auth')expected.push(stage==='upload'?target.upload:target.metadata);if(stage==='file')expected.push(target.file);
        if(failure.followed)expected.push('https://followed.invalid/start','https://followed.invalid/end');
        assert.deepEqual(calls,expected);
        assert.equal((await response.json()).ok,false);
      }
    });
  });
}
