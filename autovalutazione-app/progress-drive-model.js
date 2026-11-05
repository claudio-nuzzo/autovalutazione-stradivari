/* Pure functions shared by the Drive synchronisation and its tests. */
(function (root) {
  'use strict';
  const compare = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  function heads(revisions) {
    const ids = new Set(revisions.map(r => r.id));
    const parents = new Set();
    for (const revision of revisions) {
      for (const id of revision.parents || []) if (ids.has(id)) parents.add(id);
    }
    return revisions.filter(r => !parents.has(r.id));
  }
  // Local changes without a common revision and concurrent remote branches
  // require a deliberate choice. No clock or write wins automatically.
  function decide({ local, remote, localRevision, remoteHeads }) {
    if (remoteHeads.length > 1) return 'conflict';
    if (!remoteHeads.length) return local ? 'upload' : 'empty';
    if (!local) return 'download';
    if (compare(local, remote)) return 'same';
    if (localRevision === remoteHeads[0].id) return 'upload';
    return 'conflict';
  }
  const api = { heads, decide };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.StradivariProgressModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
