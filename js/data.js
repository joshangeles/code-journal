/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
function storageHandler(event) {
  var dataJSON = JSON.stringify(data);
  window.localStorage.setItem('data', dataJSON);
}
window.addEventListener('beforeunload', storageHandler);
var savedData = window.localStorage.getItem('data');
if (savedData !== null) {
  data = JSON.parse(savedData);
}
