const test = require('node:test');
const assert = require('node:assert/strict');
require('../autovalutazione-app/progress-storage.js');
const {replace,recoverAll} = globalThis.StradivariStorageTransaction;
const email='restore.test@istitutostradivari.it';
const keys=[`stradivari-study-v1:${email}`,`stradivari-teaching-v1:${email}`,`stradivari-digcomp-progress:v2:${email}:alunno`,`stradivari-digcomp-progress:v2:${email}:docente`,`stradivari-assessment-v1:${email}:alunno`,`stradivari-assessment-v1:${email}:docente`,`stradivari-digcomp-v1-suppressed:${email}`];
function fixture(fail) {
  const storage={getItem(key){return Object.hasOwn(this,key)?this[key]:null;},removeItem(key){delete this[key];},setItem(key,value){if(fail(key,value))throw new Error('QuotaExceededError');this[key]=String(value);}};
  keys.forEach((key,index)=>storage[key]=`old-${index}`);
  return storage;
}
const updates=keys.map((key,index)=>({key,value:`new-${index}`}));
test('quota midway through a restore rolls back all keys and legacy suppression',()=>{
  const storage=fixture((key,value)=>key===keys[3]&&value==='new-3');
  assert.throws(()=>replace(storage,email,updates),/progressi precedenti sono stati ripristinati/);
  keys.forEach((key,index)=>assert.equal(storage.getItem(key),`old-${index}`));
  assert.equal(storage.getItem(`stradivari-restore-journal:v1:${email}`),null);
});
test('an interrupted rollback leaves an undo journal recoverable before modules start',()=>{
  let blocked=true;
  const storage=fixture(key=>blocked&&key===keys[3]);
  assert.throws(()=>replace(storage,email,updates),error=>error.recoveryRequired===true);
  assert.notEqual(storage.getItem(`stradivari-restore-journal:v1:${email}`),null);
  blocked=false;recoverAll(storage);
  keys.forEach((key,index)=>assert.equal(storage.getItem(key),`old-${index}`));
  assert.equal(storage.getItem(`stradivari-restore-journal:v1:${email}`),null);
});
test('if the undo journal cannot be saved, no progress key changes',()=>{
  const storage=fixture(key=>key.startsWith('stradivari-restore-journal:'));
  assert.throws(()=>replace(storage,email,updates),/QuotaExceededError/);
  keys.forEach((key,index)=>assert.equal(storage.getItem(key),`old-${index}`));
});
