import { useState, useCallback, useEffect } from 'react';
import { getTodos, insertTodo, updateTodo, deleteTodo, toggleTodo, searchTodos } from '../services/db';
import { Todo } from '../types';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTodos();
    setRefreshing(false);
  }, [loadTodos]);

  const addTodo = useCallback(async (title: string) => {
    try {
      await insertTodo(title);
      loadTodos();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add todo');
    }
  }, [loadTodos]);

  const updateTodoTitle = useCallback(async (id: number, title: string) => {
    try {
      await updateTodo(id, title);
      loadTodos();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update todo');
    }
  }, [loadTodos]);

  const toggleTodoStatus = useCallback(async (id: number, done: number) => {
    try {
      await toggleTodo(id, done === 1 ? 0 : 1);
      loadTodos();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to toggle todo');
    }
  }, [loadTodos]);

  const removeTodo = useCallback(async (id: number) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete todo');
    }
  }, [loadTodos]);

  const searchTodoItems = useCallback(async (query: string) => {
    if (!query.trim()) {
      loadTodos();
      return;
    }
    try {
      setLoading(true);
      const results = await searchTodos(query);
      setTodos(results);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to search todos');
    } finally {
      setLoading(false);
    }
  }, [loadTodos]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return {
    todos,
    loading,
    error,
    refreshing,
    addTodo,
    updateTodoTitle,
    toggleTodoStatus,
    removeTodo,
    searchTodoItems,
    handleRefresh,
  };
};