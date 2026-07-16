import Task from "../components/Task";
import Header from "../components/Header";
import { getTasks } from "../services/tasks";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function Done() {
  const [tasks, setTasks] = useState([]);
  const { userId } = useOutletContext();

  dayjs.extend(relativeTime);

  const handleRemoveTask = (idToRemove) => {
    setTasks((prevList) => prevList.filter((task) => task.id !== idToRemove));
  };
  useEffect(() => {
    async function loadTasks() {
      try {
        const allTasks = await getTasks(userId, {
          complete: true,
        });
        setTasks(allTasks);
      } catch (error) {
        console.error(`Failed to load tasks: ${error}`);
      }
    }
    if (userId) loadTasks();
  }, [userId]);
  return (
    <>
      <Header title="DONE" />
      {tasks.map((task) => {
        const timeAgo = dayjs(task.completed_at).fromNow();
        return (
          <Task
            key={task.id}
            taskId={task.id}
            text={task.task}
            details={timeAgo}
            showButtons={true}
            buttons={["done", "delete"]}
            showDetails={true}
            showPosition={false}
            complete={task.complete}
            onStatusChange={handleRemoveTask}
          />
        );
      })}
    </>
  );
}
