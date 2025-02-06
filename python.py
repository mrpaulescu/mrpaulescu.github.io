import sqlite3
import json
import os

# Path to Anki's collection database (Change this if needed)
ANKI_DB_PATH = os.path.expanduser("~/AppData/Roaming/Anki2/User 1/collection.anki2")
EXPORT_PATH = os.path.join(os.getcwd(), r"D:\Submed gut\Submed\assets\files\flashcards.json")

# Connect to Anki database
conn = sqlite3.connect(ANKI_DB_PATH)
cursor = conn.cursor()

# Fetch flashcards (questions, answers, and deck names) via the cards table
cursor.execute("""
    SELECT n.flds, d.name
    FROM notes n
    JOIN cards c ON n.id = c.nid
    JOIN decks d ON c.did = d.id
""")
rows = cursor.fetchall()

# Organize flashcards by deck
decks = {}

for row in rows:
    fields = row[0].split("\x1f")  # Anki separates fields with \x1f
    deck_name = row[1]
    
    # Create a new deck if it doesn't exist
    if deck_name not in decks:
        decks[deck_name] = []

    # Add flashcard to the corresponding deck
    if len(fields) > 1:
        decks[deck_name].append({"question": fields[0], "answer": fields[1]})
    elif len(fields) == 1:
        decks[deck_name].append({"question": fields[0], "answer": "No answer provided"})
    else:
        decks[deck_name].append({"question": "No question", "answer": "No answer"})

conn.close()

# Save decks to JSON file
with open(EXPORT_PATH, "w", encoding="utf-8") as file:
    json.dump(decks, file, indent=4)

print(f"Flashcards grouped by decks and saved at {EXPORT_PATH}")
