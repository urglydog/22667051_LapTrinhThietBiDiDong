import axios from "axios";

let API_URL = "https://mockapi.io/api/v1/expenses";

export function setApiUrl(url: string) {
  API_URL = url;
}

export function getApiUrl() {
  return API_URL;
}

export async function syncExpenses(expenses: any[]) {
  try {
    // Step 1: Get all existing expenses from API
    let existingExpenses = [];
    try {
      const response = await axios.get(API_URL);
      existingExpenses = response.data || [];
    } catch (e) {
      // API might be empty, continue
    }

    // Step 2: Delete all existing expenses
    if (existingExpenses.length > 0) {
      const deletePromises = existingExpenses.map((exp: any) =>
        axios.delete(`${API_URL}/${exp.id}`).catch(() => {
          // Ignore delete errors
        })
      );
      await Promise.all(deletePromises);
    }

    // Step 3: Post new expenses
    const promises = expenses.map(expense =>
      axios.post(API_URL, {
        title: expense.title,
        amount: expense.amount,
        type: expense.type || "Chi",
        createdAt: expense.createdAt,
      })
    );
    await Promise.all(promises);
    return { success: true };
  } catch (e: any) {
    console.error("Sync failed:", e);
    throw new Error(e.response?.data?.message || "Đồng bộ thất bại");
  }
}

