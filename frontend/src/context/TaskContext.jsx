import { createContext, useContext, useState, useCallback } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTasks = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <TaskContext.Provider value={{ refreshKey, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
