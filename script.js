// Load notes from local storage on page load
window.onload = function () {
  loadNotes();
};

// Function to load notes from local storage
function loadNotes() {
  var notes = JSON.parse(localStorage.getItem('notes')) || [];
  var notesList = document.getElementById('notes-list');

  // Clear existing notes
  notesList.innerHTML = '';

  // Populate the notes list with saved notes
  notes.forEach(function (noteText) {
    createNoteElement(noteText);
  });
}

// Function to add or update a note
function addOrUpdateNote() {
  var noteInput = document.getElementById('note-input');
  var noteText = noteInput.value.trim();

  if (noteText !== '') {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Check if editing an existing note
    var editIndex = noteInput.dataset.editIndex;
    if (editIndex !== undefined) {
      // Update the existing note
      notes[editIndex] = noteText;
      noteInput.removeAttribute('data-edit-index');
    } else {
      // Add a new note
      notes.push(noteText);
    }

    // Save notes to local storage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Load and display updated notes
    loadNotes();

    // Clear the input field
    noteInput.value = '';
  }
}

// Function to create a note element with delete and edit buttons
function createNoteElement(noteText) {
  var notesList = document.getElementById('notes-list');

  var listItem = document.createElement('li');
  listItem.innerText = noteText;

  var editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.onclick = function () {
    // Set the note text to the input field for editing
    document.getElementById('note-input').value = noteText;
    document.getElementById('note-input').dataset.editIndex = Array.from(notesList.children).indexOf(listItem);
  };

  var deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.onclick = function () {
    // Remove the note when the delete button is clicked
    var index = Array.from(notesList.children).indexOf(listItem);
    deleteNote(index);
  };

  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  notesList.appendChild(listItem);
}

// Function to delete a note
function deleteNote(index) {
  var notes = JSON.parse(localStorage.getItem('notes')) || [];

  // Remove the note at the specified index
  notes.splice(index, 1);

  // Save the updated notes to local storage
  localStorage.setItem('notes', JSON.stringify(notes));

  // Load and display updated notes
  loadNotes();
}
