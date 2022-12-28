var $previewImage = document.querySelector('img#preview');
var $photoURLInput = document.querySelector('[name="photo"]');
var $entryForm = document.querySelector('form');
function previewImageHandler(event) {
  $previewImage.setAttribute('src', $photoURLInput.value);
}
function submitHandler(event) {
  event.preventDefault();
  var entry = {};
  entry.title = $entryForm.elements.title.value;
  entry.photo = $entryForm.elements.photo.value;
  entry.notes = $entryForm.elements.notes.value;
  entry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(entry);
  $previewImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}
$photoURLInput.addEventListener('input', previewImageHandler);
$entryForm.addEventListener('submit', submitHandler);
