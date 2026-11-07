// Find the form and Cancel button
const noteForm = document.getElementById("note-form");
const cancelButton = document.getElementById("cancel");

// Function to save a note
function saveNote(event) {
    event.preventDefault();

    const title = document.getElementById("note-title").value;
    const content = document.getElementById("note-content").value;

    // Get previously saved notes, or start with an empty list
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Create a new note
    const newNote = {
        id: Date.now(),
        title: title,
        content: content
    };

    // Add the new note to the list
    notes.push(newNote);

    // Save the updated list
    localStorage.setItem("notes", JSON.stringify(notes));

    alert("Note saved successfully!");

    window.location.href = "viewNote.html";
}

// Function to cancel a note
function cancelNote() {
    const confirmed = confirm("Discard this note?");

    if (confirmed) {
        window.location.href = "viewNote.html";
    }
}

// Connect the functions to the form and button
if (noteForm && cancelButton) {
    noteForm.addEventListener("submit", saveNote);
    cancelButton.addEventListener("click", cancelNote);
}

// Find the View Notes container
const notesContainer = document.getElementById("notes-container");

// Function to display saved notes
function viewNotes() {

    // Get saved notes from localStorage
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Clear existing notes from the page
    notesContainer.innerHTML = "";

    // Check if there are no notes
    if (notes.length === 0) {
        notesContainer.textContent = "No notes saved yet.";
        return;
    }

    // Display each saved note
    notes.forEach(function(note, index) {

        // Create a clickable note card
        const noteCard = document.createElement("a");

        // Give the card its CSS class
        noteCard.className = "note-card";

        // Link to the selected note
        noteCard.href = "openNote.html?id=" + note.id;

        // Create the note number
        const noteNumber = document.createElement("h2");
        noteNumber.textContent = "Note " + (index + 1);

        // Create the note title
        const noteTitle = document.createElement("p");
        noteTitle.textContent = note.title;

        // Put the number and title inside the card
        noteCard.appendChild(noteNumber);
        noteCard.appendChild(noteTitle);

        // Add the card to the page
        notesContainer.appendChild(noteCard);
    });
}

// Only run on the View Notes page
if (notesContainer) {
    viewNotes();
}

// Find elements on the Open Note page
const backButton = document.getElementById("back");
const noteError = document.getElementById("note-error");

// Function to open a saved note
function openNote() {

    // Get the note ID from the URL
    const params = new URLSearchParams(window.location.search);
    const noteId = params.get("id");

    // Get saved notes
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Find the note with the matching ID
    const note = notes.find(function(savedNote) {
        return String(savedNote.id) === noteId;
    });

    // Check if the note exists
    if (!note) {
        noteError.textContent = "Note not found. Please return to View Notes.";
        return;
    }

    // Display the saved note
    document.getElementById("note-title").value = note.title;
    document.getElementById("note-content").value = note.content;
}

// Only run on the Open Note page
if (backButton) {

    openNote();

    backButton.addEventListener("click", function() {
        window.location.href = "viewNote.html";
    });
}