var previewImage = document.querySelector('img#preview');
var photoURLInput = document.querySelector('[name="photo-url"]');
function previewImageHandler(event) {
  previewImage.setAttribute('src', photoURLInput.value);
}
photoURLInput.addEventListener('input', previewImageHandler);
