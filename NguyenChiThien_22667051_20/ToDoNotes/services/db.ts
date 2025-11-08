import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

type SQLCallback = (tx: any) => void;

const openDatabase = () => {
  if (Platform.OS === 'web') {
    return {
      transaction: (callback: SQLCallback) => {
        callback({
          executeSql: () => {},
        });
      },
    };
  }

  return SQLite.openDatabaseSync('todos.db');
};

const db = openDatabase();

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Create todos table if it doesn't exist
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          done INTEGER DEFAULT 0,
          created_at INTEGER
        )`,
        [],
        () => {
          // Check if table is empty for optional seeding
          tx.executeSql(
            'SELECT COUNT(*) as count FROM todos',
            [],
            (_, { rows }) => {
              const count = rows._array[0].count;
              if (count === 0) {
                // Seed initial data
                tx.executeSql(
                  'INSERT INTO todos (title, created_at) VALUES (?, ?)',
                  ['Welcome to Todo Notes!', Date.now()],
                  () => resolve(true),
                  (_, error) => reject(error)
                );
              } else {
                resolve(true);
              }
            },
            (_, error) => reject(error)
          );
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const getTodos = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM todos ORDER BY created_at DESC',
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });
};

export const insertTodo = (title: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO todos (title, created_at) VALUES (?, ?)',
        [title, Date.now()],
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
      );
    });
  });
};

export const updateTodo = (id: number, title: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE todos SET title = ? WHERE id = ?',
        [title, id],
        () => resolve(true),
        (_, error) => reject(error)
      );
    });
  });
};

export const toggleTodo = (id: number, done: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE todos SET done = ? WHERE id = ?',
        [done, id],
        () => resolve(true),
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteTodo = (id: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM todos WHERE id = ?',
        [id],
        () => resolve(true),
        (_, error) => reject(error)
      );
    });
  });
};

export const searchTodos = (query: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM todos WHERE title LIKE ? ORDER BY created_at DESC',
        [`%${query}%`],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });
};