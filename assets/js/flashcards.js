const ankiAPI = "http://127.0.0.1:8765";
let flashcards = [];
let currentCardIndex = 0;

// Fetch flashcards from Anki
async function getFlashcards() {
    const requestPayload = {
        action: "findNotes",
        version: 6,
        params: { query: "deck:Sange" } // Change 'Default' to your Anki deck name
    };

    try {
        const response = await fetch(ankiAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestPayload)
        });

        const data = await response.json();
        if (data.result.length > 0) {
            await getNoteContents(data.result);
        } else {
            document.getElementById("question").innerText = "No flashcards found.";
        }
    } catch (error) {
        console.error("Error fetching flashcards:", error);
    }
}

// Get flashcard content by note IDs
async function getNoteContents(noteIDs) {
    const requestPayload = {
        action: "notesInfo",
        version: 6,
        params: { notes: noteIDs }
    };

    try {
        const response = await fetch(ankiAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestPayload)
        });

        const data = await response.json();
        flashcards = data.result.map(note => ({
            question: note.fields.Front.value,  // Adjust if your fields have different names
            answer: note.fields.Back.value
        }));

        showFlashcard(0); // Show first flashcard
    } catch (error) {
        console.error("Error fetching note contents:", error);
    }
}

// Display a flashcard
function showFlashcard(index) {
    if (flashcards.length === 0) return;

    currentCardIndex = index;
    document.getElementById("question").innerText = flashcards[index].question;
    document.getElementById("answer").style.display = "none";
    document.getElementById("answer").innerText = flashcards[index].answer;
}

// Button event listeners
document.getElementById("show-answer").addEventListener("click", () => {
    document.getElementById("answer").style.display = "block";
});

document.getElementById("prev-card").addEventListener("click", () => {
    if (currentCardIndex > 0) showFlashcard(currentCardIndex - 1);
});

document.getElementById("next-card").addEventListener("click", () => {
    if (currentCardIndex < flashcards.length - 1) showFlashcard(currentCardIndex + 1);
});

// Load flashcards when page loads
getFlashcards();
