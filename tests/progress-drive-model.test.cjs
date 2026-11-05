const { test } = require('node:test');
const assert = require('node:assert/strict');
require('../autovalutazione-app/progress-drive-model.js');
const { heads, decide } = globalThis.StradivariProgressModel;

test('detects concurrent revisions instead of choosing by timestamp', () => {
  const revisions = [{id:'a', parents:[]}, {id:'b',parents:['a']}, {id:'c',parents:['a']}];
  assert.deepEqual(heads(revisions).map(r => r.id), ['b', 'c']);
  assert.equal(decide({local:{a:1},remote:{a:2},localRevision:'a',remoteHeads:heads(revisions)}), 'conflict');
});
test('handles first sign in, same data, and unverified divergent copies', () => {
  const head = [{id:'b'}];
  assert.equal(decide({local:null,remote:{a:2},remoteHeads:head}), 'download');
  assert.equal(decide({local:{a:1},remote:{a:1},remoteHeads:head}), 'same');
  assert.equal(decide({local:{a:1},remote:{a:2},localRevision:'old',remoteHeads:head}), 'conflict');
  assert.equal(decide({local:{a:1},remote:{a:2},localRevision:'b',remoteHeads:head}), 'upload');
  assert.equal(decide({local:{a:1},remote:null,remoteHeads:[]}), 'upload');
});
