/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function storageHandler(event) {
  var dataJSON = JSON.stringify(data.entries);
  window.localStorage.setItem('entryData', dataJSON);
}

window.addEventListener('beforeunload', storageHandler);
