import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("expenses.db");

export async function initDB() {
  // Create table for expenses
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, amount REAL, type TEXT, createdAt TEXT, is_deleted INTEGER DEFAULT 0);"
  );
  
  // Migrate existing databases - add columns if they don't exist
  try {
    await db.execAsync("ALTER TABLE expenses ADD COLUMN amount REAL;");
  } catch (e) {
    // Column already exists, ignore
  }
  
  try {
    await db.execAsync("ALTER TABLE expenses ADD COLUMN type TEXT;");
  } catch (e) {
    // Column already exists, ignore
  }
  
  try {
    await db.execAsync("ALTER TABLE expenses ADD COLUMN createdAt TEXT;");
  } catch (e) {
    // Column already exists, ignore
  }
  
  try {
    await db.execAsync("ALTER TABLE expenses ADD COLUMN is_deleted INTEGER DEFAULT 0;");
  } catch (e) {
    // Column already exists, ignore
  }
}

export async function getAllExpenses() {
  const result = await db.getAllAsync("SELECT * FROM expenses WHERE is_deleted = 0 ORDER BY id DESC;");
  return result;
}

export async function getExpensesByType(type: string) {
  if (type === "all") {
    return getAllExpenses();
  }
  const result = await db.getAllAsync("SELECT * FROM expenses WHERE is_deleted = 0 AND type = ? ORDER BY id DESC;", [type]);
  return result;
}

export async function getDeletedExpenses() {
  const result = await db.getAllAsync("SELECT * FROM expenses WHERE is_deleted = 1 ORDER BY id DESC;");
  return result;
}

export async function addExpense(title: string, amount: number, type: string) {
  const createdAt = new Date().toLocaleString("vi-VN");
  await db.runAsync("INSERT INTO expenses (title, amount, type, createdAt) VALUES (?, ?, ?, ?);", [
    title,
    amount,
    type,
    createdAt,
  ]);
}

export async function updateExpense(id: number, title: string, amount: number, type: string) {
  await db.runAsync("UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?;", [
    title,
    amount,
    type,
    id,
  ]);
}

export async function deleteExpense(id: number) {
  await db.runAsync("UPDATE expenses SET is_deleted = 1 WHERE id = ?;", [id]);
}

export async function restoreExpense(id: number) {
  await db.runAsync("UPDATE expenses SET is_deleted = 0 WHERE id = ?;", [id]);
}

export async function permanentlyDeleteExpense(id: number) {
  await db.runAsync("DELETE FROM expenses WHERE id = ?;", [id]);
}

// Get statistics
export async function getStatistics() {
  const income = await db.getAllAsync("SELECT SUM(amount) as total FROM expenses WHERE is_deleted = 0 AND type = 'Thu';") as any[];
  const expense = await db.getAllAsync("SELECT SUM(amount) as total FROM expenses WHERE is_deleted = 0 AND type = 'Chi';") as any[];
  
  const incomeByMonth = await db.getAllAsync(`
    SELECT 
      strftime('%Y-%m', createdAt) as month,
      SUM(amount) as total
    FROM expenses 
    WHERE is_deleted = 0 AND type = 'Thu'
    GROUP BY month
    ORDER BY month DESC
  `);
  
  const expenseByMonth = await db.getAllAsync(`
    SELECT 
      strftime('%Y-%m', createdAt) as month,
      SUM(amount) as total
    FROM expenses 
    WHERE is_deleted = 0 AND type = 'Chi'
    GROUP BY month
    ORDER BY month DESC
  `);
  
  return {
    totalIncome: income[0]?.total || 0,
    totalExpense: expense[0]?.total || 0,
    incomeByMonth: incomeByMonth || [],
    expenseByMonth: expenseByMonth || [],
  };
}

