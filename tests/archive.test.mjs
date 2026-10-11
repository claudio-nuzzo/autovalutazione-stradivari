import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import worker from '../worker.js';
const owner='synthetic.teacher@istitutostradivari.it';
const token='synthetic-institutional-id-token';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
function upload(){
  const bytes=Buffer.from('%PDF-synthetic-bytes'),uuid='acbc0191-a0ba-47ee-9828-4ace88ded460';
  const body={tipo:'attestato-digcomp',titolo:'Attestazione di autoformazione Metodo di insegnamento e DigComp 3.0',classe:'',materia:'Autoformazione docente',filename:'Autoformazione-DigComp-2026-27-'+uuid+'.pdf',mime:'application/pdf',size:bytes.length,base64:bytes.toString('base64'),request_id:uuid,anno_scolastico:'2026/27'};
  body.fingerprint=hash(JSON.stringify([owner,body.tipo,body.titolo,body.classe,body.materia,body.filename,body.mime,body.size,hash(bytes)]));return body;
}
const request=(path,body)=>new Request('https://synthetic.invalid'+path,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
async function mockFetch(fn,run){
  const original=globalThis.fetch;globalThis.fetch=async(url,opt)=>{
    if(url==='https://accesso.stradilab.org/v1/profile'){
      assert.equal(JSON.parse(opt.body).idToken,token);assert.equal(opt.redirect,'error');
      return Response.json({ok:true,email:owner,isDocente:true});
    }
    assert.equal(opt.headers.Authorization,'Bearer '+token);return fn(url,opt);
  };try{await run();}finally{globalThis.fetch=original;}
}
test('same-origin runtime validates exact annual self-declaration schema and forwards same token',async()=>{
  const body=upload();
  await mockFetch((url,opt)=>{assert.equal(url,'https://anagrafica.stradilab.org/carica-file');assert.deepEqual(JSON.parse(opt.body),body);return Response.json({ok:true,id:9,url:'private-drive-url'});},async()=>{
    const r=await worker.fetch(request('/api/archive/upload',body),{});
    assert.equal(r.status,200);assert.deepEqual(await r.json(),{ok:true,id:9});assert.equal(r.headers.get('Cache-Control'),'private, no-store');
  });
});
test('reject changed owner fingerprint/year/type/arbitrary folder or file ID without forwarding',async()=>{
  await mockFetch(()=>assert.fail('must not forward'),async()=>{
    for(const overrides of [{fingerprint:'0'.repeat(64)},{anno_scolastico:'2027/28'},{tipo:'formazione'},{fileId:'raw-drive-id'},{folderId:'root'},{size:1},{base64:'%%%'}]){
      const r=await worker.fetch(request('/api/archive/upload',{...upload(),...overrides}),{});assert.equal(r.status,400);
    }
    assert.equal((await worker.fetch(request('/api/archive/records/raw-drive-id/file'),{})).status,404);
    assert.equal((await worker.fetch(request('/api/archive/records/9/file?fileId=raw'),{})).status,400);
  });
});
test('private download derives numeric record from authorized owner/type metadata and returns exact bytes',async()=>{
  const bytes=Buffer.from('%PDF-original-archived-bytes'),calls=[];
  await mockFetch((url)=>{calls.push(url);return url.endsWith('/file')?new Response(bytes,{headers:{'Content-Type':'application/pdf'}}):Response.json({ok:true,consegna:{id:9,email:owner,tipo:'attestato-digcomp'}});},async()=>{
    const r=await worker.fetch(request('/api/archive/records/9/file'),{});
    assert.equal(r.status,200);assert.deepEqual(Buffer.from(await r.arrayBuffer()),bytes);
    assert.equal(r.headers.get('Cache-Control'),'private, no-store');assert.equal(r.headers.get('X-Content-Type-Options'),'nosniff');
    assert.deepEqual(calls,['https://anagrafica.stradilab.org/consegne/9','https://anagrafica.stradilab.org/consegne/9/file']);
  });
});
test('wrong owner/type/mismatched returned record cannot reach archived bytes',async()=>{
  for(const changed of [{email:'other@example.invalid'},{tipo:'formazione'},{id:8},{id:'9'}]) await mockFetch(url=>{
    assert.equal(url,'https://anagrafica.stradilab.org/consegne/9');return Response.json({consegna:{id:9,email:owner,tipo:'attestato-digcomp',...changed}});
  },async()=>assert.equal((await worker.fetch(request('/api/archive/records/9/file'),{})).status,404));
});
test('unauthenticated/nonteacher blocked; static assets still served unchanged; uncertain upload is not success',async()=>{
  const original=globalThis.fetch;
  try{
    globalThis.fetch=async()=>Response.json({ok:true,email:owner,isDocente:false});
    assert.equal((await worker.fetch(request('/api/archive/upload',upload()),{})).status,401);
    assert.equal((await worker.fetch(new Request('https://synthetic.invalid/api/archive/records/9/file'),{})).status,401);
    assert.equal(await (await worker.fetch(new Request('https://synthetic.invalid/'),{ASSETS:{fetch:()=>new Response('static')}})).text(),'static');
  }finally{globalThis.fetch=original;}
  await mockFetch(()=>{throw new Error('synthetic timeout');},async()=>assert.equal((await worker.fetch(request('/api/archive/upload',upload()),{})).status,503));
});
