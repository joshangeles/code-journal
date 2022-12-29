// issue-1-create-an-entry: allows users to create entries
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
  data.entries.unshift(entry);
  $previewImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  var $newEntry = renderEntry(entry);
  $entryList.prepend($newEntry);
  viewSwap('entries');
  if ($entryList.hasChildNodes && $displayNoEntries.getAttribute('class') !== 'hidden') {
    toggleNoEntries();
  }
}
$photoURLInput.addEventListener('input', previewImageHandler);
$entryForm.addEventListener('submit', submitHandler);

// issue-2-can-view-entries: users can view their entries
var $entryList = document.querySelector('ul');
var $displayNoEntries = document.querySelector('#display-no-entries');
var $viewContainer = document.querySelector('main');
var $viewList = $viewContainer.querySelectorAll('[data-view]');
var $entriesAnchor = document.querySelector('#entries-view');
var $newEntryButton = document.querySelector('#entry-form-view');
function renderEntry(entry) {
  var $entryListItem = document.createElement('li');
  var $entryRow = document.createElement('div');
  var $entryPhotoContainer = document.createElement('div');
  var $entryPhoto = document.createElement('img');
  var $entryTextContainer = document.createElement('div');
  var $entryTitle = document.createElement('h2');
  var $entryNotes = document.createElement('p');
  $entryRow.setAttribute('class', 'row');
  $entryPhotoContainer.setAttribute('class', 'column-half');
  $entryPhoto.setAttribute('class', 'border-round');
  $entryPhoto.setAttribute('src', entry.photo);
  $entryTextContainer.setAttribute('class', 'column-half');
  $entryTitle.textContent = entry.title;
  $entryNotes.textContent = entry.notes;
  $entryListItem.appendChild($entryRow);
  $entryRow.appendChild($entryPhotoContainer);
  $entryPhotoContainer.appendChild($entryPhoto);
  $entryRow.appendChild($entryTextContainer);
  $entryTextContainer.appendChild($entryTitle);
  $entryTextContainer.appendChild($entryNotes);
  return $entryListItem;
}

function DOMContentHandler(event) {
  for (var entriesIndex = 0; entriesIndex < data.entries.length; entriesIndex++) {
    var entryDOMTree = renderEntry(data.entries[entriesIndex]);
    $entryList.appendChild(entryDOMTree);
    viewSwap(data.view);
    if (data.entries.length > 0 && $displayNoEntries.getAttribute('class') !== 'hidden') {
      toggleNoEntries();
    }
  }
}

document.addEventListener('DOMContentLoaded', DOMContentHandler);

function toggleNoEntries() {
  if ($displayNoEntries.getAttribute('class') !== 'hidden') {
    $displayNoEntries.setAttribute('class', 'hidden');
  } else {
    $displayNoEntries.setAttribute('class', 'text-align-center');
  }
}
function viewSwap(currentView) {
  data.view = currentView;
  for (var viewIndex = 0; viewIndex < $viewList.length; viewIndex++) {
    if ($viewList[viewIndex].getAttribute('data-view') === currentView) {
      $viewList[viewIndex].className = '';
    } else {
      $viewList[viewIndex].className = 'hidden';
    }
  }
}

function viewSwapHandler(event) {
  if (event) {
    if (event.target.matches('#entries-view')) {
      viewSwap('entries');
    }
    if (event.target.matches('#entry-form-view')) {
      viewSwap('entry-form');
    }
  }
}

$entriesAnchor.addEventListener('click', viewSwapHandler);
$newEntryButton.addEventListener('click', viewSwapHandler);
