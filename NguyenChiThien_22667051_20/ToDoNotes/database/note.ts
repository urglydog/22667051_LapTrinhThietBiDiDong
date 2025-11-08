import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("notes.db");

export async function initDB() {
  // Create table with all columns
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, note TEXT, date TEXT, is_deleted INTEGER DEFAULT 0);"
  );
  
  // Migrate existing databases - add note column if it doesn't exist
  try {
    await db.execAsync("ALTER TABLE notes ADD COLUMN note TEXT;");
  } catch (e) {
    // Column already exists, ignore
  }
  
  // Migrate existing databases - add is_deleted column if it doesn't exist
  try {
    await db.execAsync("ALTER TABLE notes ADD COLUMN is_deleted INTEGER DEFAULT 0;");
  } catch (e) {
    // Column already exists, ignore
  }
}

export async function getAllNotes() {
  const result = await db.getAllAsync("SELECT * FROM notes WHERE is_deleted = 0 ORDER BY id DESC;");
  return result;
}

export async function getDeletedNotes() {
  const result = await db.getAllAsync("SELECT * FROM notes WHERE is_deleted = 1 ORDER BY id DESC;");
  return result;
}

export async function addNote(title: string, note: string) {
  const date = new Date().toLocaleString("vi-VN");
  await db.runAsync("INSERT INTO notes (title, note, date) VALUES (?, ?, ?);", [
    title,
    note,
    date,
  ]);
}

export async function updateNote(id: number, title: string, note: string) {
  await db.runAsync("UPDATE notes SET title = ?, note = ? WHERE id = ?;", [
    title,
    note,
    id,
  ]);
}

export async function deleteNote(id: number) {
  await db.runAsync("UPDATE notes SET is_deleted = 1 WHERE id = ?;", [id]);
}

export async function restoreNote(id: number) {
  await db.runAsync("UPDATE notes SET is_deleted = 0 WHERE id = ?;", [id]);
}

export async function permanentlyDeleteNote(id: number) {
  await db.runAsync("DELETE FROM notes WHERE id = ?;", [id]);
}
