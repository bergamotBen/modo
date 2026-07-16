import Header from "../components/Header";
import Task from "../components/Task";
import Breaktime from "../components/Breaktime";
import { useState, useEffect } from "react";
import { getTasks } from "../services/tasks";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const [breaktime, setBreaktime] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { userId } = useOutletContext();

  useEffect(() => {
    async function loadTasks() {
      try {
        const allTasks = await getTasks(userId, { complete: false });
        setTasks(allTasks);
      } catch (error) {
        console.error(`Failed to load tasks: ${error}`);
      }
    }
    if (userId) loadTasks();
  }, [userId]);
  return (
    <div>
      <Header />
      {breaktime ? <Breaktime /> : null}

      {tasks.map((task) => (
        <Task key={task.id} active={task.active} text={task.task} />
      ))}
      <Task
        text="An in-progress task with no position and no buttons"
        showPosition={false}
        showDetails={false}
        showButtons={true}
        buttons={["play", "stop", "delete"]}
        active={true}
      />
      <Task
        text="A todo task with no position and no buttons"
        showPosition={false}
        showDetails={false}
        showButtons={false}
        active={false}
      />
    </div>
  );
}
