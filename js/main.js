var $previewImage = document.querySelector('img#preview');
var $photoURLInput = document.querySelector('[name="photo-url"]');
var $entryForm = document.querySelector('form');
function previewImageHandler(event) {
  $previewImage.setAttribute('src', $photoURLInput.value);
}
function submitHandler(event) {
  event.preventDefault();
}
$photoURLInput.addEventListener('input', previewImageHandler);
$entryForm.addEventListener('submit', submitHandler);
