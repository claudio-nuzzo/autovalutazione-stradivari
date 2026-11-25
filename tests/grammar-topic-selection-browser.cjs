const {launchBrowser}=require('./browser-runtime.cjs');
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const base=path.resolve(__dirname,'../autovalutazione-app/grammatica');
const server=http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname,file=path.join(base,pathname==='/'?'index.html':pathname);if(!file.startsWith(base+path.sep)){res.writeHead(403);return res.end()}try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.json')?'application/json':'text/html');res.end(fs.readFileSync(file))}catch{res.writeHead(404);res.end()}});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await launchBrowser();try{
  const page=await browser.newPage({viewport:{width:375,height:812}});
  await page.goto('http://127.0.0.1:'+server.address().port+'/');
  await page.locator('[data-track=moda]').click();
  await page.selectOption('#topic','parole|Articolo');
  // Simulate a topic whose activities are all reserved for assessment.
  await page.evaluate(()=>{window.__changed=window.ATELIER_REVIEW_BANK.filter(x=>x.area==='parole'&&(x.topicGroup||'Articolo')==='Articolo');window.__changed.forEach(x=>{x.__wasAssessmentOnly=x.assessmentOnly;x.assessmentOnly=true})});
  await page.evaluate(()=>window.ATELIER_LEARNING_BRIDGE.practice());
  assert.equal(await page.locator('#work').isHidden(),true,'an unavailable topic must not start another topic');
  assert.match(await page.locator('#syncStatus').innerText(),/non ci sono attività/);
  await page.evaluate(()=>window.__changed.forEach(x=>{x.assessmentOnly=x.__wasAssessmentOnly;delete x.__wasAssessmentOnly}));
  await page.evaluate(()=>window.ATELIER_LEARNING_BRIDGE.practice());
  await page.waitForSelector('#work .exercise:not([hidden])');
  const groups=await page.locator('#work .exercise').evaluateAll(cards=>cards.map(x=>x.dataset.topicGroup));
  assert.ok(groups.length>0&&groups.every(x=>x==='Articolo'),'available practice stays in the selected topic');
  console.log('PASS: an unavailable topic never silently falls back to another topic');
}finally{await browser.close();server.close()}})().catch(error=>{console.error(error);process.exit(1)});
