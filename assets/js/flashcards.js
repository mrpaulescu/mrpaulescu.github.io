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
        console.log("API Response:", data); // Log full response to debug

        if (!data.result || !Array.isArray(data.result)) {
            console.error("Invalid response structure:", data);
            return;
        }

        flashcards = data.result.map(note => {
            console.log("Note Fields:", note.fields); // Debugging note fields
            return {
                question: note.fields?.Front?.value || "No question found",
                answer: note.fields?.Back?.value || "No answer found"
            };
        });

        showFlashcard(0); // Show first flashcard
    } catch (error) {
        console.error("Error fetching note contents:", error);
    }
}
