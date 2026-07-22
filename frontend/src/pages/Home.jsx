import Header from "../components/Header";
import Task from "../components/Task";
import Breaktime from "../components/Breaktime";
import { useState, useEffect } from "react";
import { getTasks } from "../services/tasks";
import { useOutletContext } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export default function Home() {
  const [breaktime, setBreaktime] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { userId, userName } = useOutletContext();
  const { refreshKey } = useTasks();

  useEffect(() => {
    async function loadTasks() {
      try {
        const allTasks = await getTasks(userId, {
          complete: false,
          orderBy: "priority",
          ascending: true,
        });

        const activeTask = allTasks.find((task) => task.active === true);
        const inactiveTasks = allTasks.filter((task) => task.active !== true);

        if (activeTask) {
          setTasks([activeTask, ...inactiveTasks]);
        } else {
          setTasks(allTasks);
        }
      } catch (error) {
        console.error(`Failed to load tasks: ${error}`);
      }
    }
    if (userId) loadTasks();
  }, [userId, refreshKey]);
  return (
    <div>
      <Header />
      {breaktime ? <Breaktime /> : null}
      <div className="h3, p-2">What's on the cards today {userName}?</div>
      {tasks.map((task) => {
        const buttons = [];
        if (task.active) {
          buttons.push("play");
          buttons.push("stop");
        }
        return (
          <Task
            key={task.id}
            task={task}
            buttons={buttons}
            showButtons={task.active}
            showPosition={false}
          />
        );
      })}
    </div>
  );
}
