// issue-1-create-an-entry: allows users to create entries
var $previewImage = document.querySelector('img#preview');
var $photoURLInput = document.querySelector('[name="photo"]');
var $entryForm = document.querySelector('form');
var $entryFormHeader = $entryForm.querySelector('h1');
function previewImageHandler(event) {
  $previewImage.setAttribute('src', $photoURLInput.value);
}
function submitHandler(event) {
  event.preventDefault();
  if (data.editing === null) {
    var entry = {};
    entry.title = $entryForm.elements.title.value;
    entry.photo = $entryForm.elements.photo.value;
    entry.notes = $entryForm.elements.notes.value;
    entry.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(entry);
    $previewImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    var $newEntry = renderEntry(entry);
    $entryList.prepend($newEntry);
    toggleNoEntries();
  }
  if (data.editing !== null) {
    entry = {};
    entry.title = $entryForm.elements.title.value;
    entry.photo = $entryForm.elements.photo.value;
    entry.notes = $entryForm.elements.notes.value;
    entry.entryId = data.editing.entryId;
    var matchingEntryIndex = data.entries.findIndex(obj => obj.toString() === data.editing.toString());
    data.entries.splice(matchingEntryIndex, 1, entry);
    $newEntry = renderEntry(entry);
    var $outdatedEntry = $entryList.querySelector('li[data-entry-id="' + entry.entryId + '"]');
    $outdatedEntry.replaceWith($newEntry);
    $entryFormHeader.textContent = 'New Entry';
    data.editing = null;
  }
  viewSwap('entries');
  $entryForm.reset();
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
  var $entryHeaderRow = document.createElement('div');
  var $entryHeaderColumn = document.createElement('div');
  var $entryTitle = document.createElement('h2');
  var $entryIcon = document.createElement('i');
  var $entryNotes = document.createElement('p');
  $entryListItem.setAttribute('data-entry-id', entry.entryId);
  $entryRow.setAttribute('class', 'row');
  $entryPhotoContainer.setAttribute('class', 'column-half');
  $entryPhoto.setAttribute('class', 'border-round');
  $entryPhoto.setAttribute('src', entry.photo);
  $entryTextContainer.setAttribute('class', 'column-half');
  $entryHeaderRow.setAttribute('class', 'row');
  $entryHeaderRow.setAttribute('id', 'entry-header-container');
  $entryHeaderColumn.setAttribute('class', 'column-full align-items-center justify-space-between no-padding flex');
  $entryIcon.setAttribute('class', 'fa fa-pencil');
  $entryIcon.setAttribute('aria-hidden', 'true');
  $entryTitle.textContent = entry.title;
  $entryNotes.textContent = entry.notes;
  $entryListItem.appendChild($entryRow);
  $entryRow.appendChild($entryPhotoContainer);
  $entryPhotoContainer.appendChild($entryPhoto);
  $entryRow.appendChild($entryTextContainer);
  $entryTextContainer.appendChild($entryHeaderRow);
  $entryHeaderRow.appendChild($entryHeaderColumn);
  $entryHeaderColumn.appendChild($entryTitle);
  $entryHeaderColumn.appendChild($entryIcon);
  $entryTextContainer.appendChild($entryNotes);
  return $entryListItem;
}

function DOMContentHandler(event) {
  for (var entriesIndex = 0; entriesIndex < data.entries.length; entriesIndex++) {
    var entryDOMTree = renderEntry(data.entries[entriesIndex]);
    $entryList.appendChild(entryDOMTree);
    viewSwap(data.view);
    toggleNoEntries();
  }
}

document.addEventListener('DOMContentLoaded', DOMContentHandler);

function toggleNoEntries() {
  if ($entryList.hasChildNodes) {
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
  if (event.target.matches('#entries-view')) {
    viewSwap('entries');
  }
  if (event.target.matches('#entry-form-view')) {
    viewSwap('entry-form');
  }
}

$entriesAnchor.addEventListener('click', viewSwapHandler);
$newEntryButton.addEventListener('click', viewSwapHandler);

// issue-3-can-edit-entries: users can edit their entries

function editHandler(event) {
  var $currentlyEditedEntry = event.target.closest('li[data-entry-id]');
  var editedEntryId = $currentlyEditedEntry.getAttribute('data-entry-id');
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(editedEntryId)) {
        data.editing = data.entries[i];
        $previewImage.setAttribute('src', data.entries[i].photo);
        $entryForm.elements.title.value = data.entries[i].title;
        $entryForm.elements.photo.value = data.entries[i].photo;
        $entryForm.elements.notes.value = data.entries[i].notes;
        $entryFormHeader.textContent = 'Edit Entry';
      }
    }
  }
  return $currentlyEditedEntry;
}

$entryList.addEventListener('click', editHandler);
