import axios from "axios";

let API_URL = "https://6819db9a1ac115563506bd6e.mockapi.io/notes";

export function setApiUrl(url: string) {
  API_URL = url;
}

export function getApiUrl() {
  return API_URL;
}

export async function syncNotes(notes: any[]) {
  try {
    // MockAPI.io expects an array, but we'll send each note individually or as a batch
    // First, delete all existing notes (if using mockapi.io collections)
    // Then post new notes
    const promises = notes.map(note => 
      axios.post(API_URL, {
        title: note.title,
        note: note.note || "",
        date: note.date,
      })
    );
    await Promise.all(promises);
    return { success: true };
  } catch (e: any) {
    console.error("Sync failed:", e);
    throw new Error(e.response?.data?.message || "Đồng bộ thất bại");
  }
}