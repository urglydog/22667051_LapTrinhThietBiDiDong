import { createContext, useState, useContext } from "react";

type Task = {
  id: number;
  title: string;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (id: number, newTitle: string) => void;
  removeTask: (id: number) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn React Native" },
    { id: 2, title: "Build a JobList App" },
  ]);

  const addTask = (title: string) => {
    if (!title.trim()) return;
    const newTask = { id: Date.now(), title };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
}
