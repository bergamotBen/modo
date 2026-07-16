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
        const allTasks = await getTasks(userId, {
          complete: false,
          orderBy: "priority",
          ascending: true,
        });
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

      {tasks.map((task) => {
        const buttons = ["delete"];
        if (task.active) {
          buttons.push("play");
          buttons.push("stop");
        }
        return (
          <Task
            key={task.id}
            active={task.active}
            text={task.task}
            buttons={buttons}
            showButtons={task.active}
            showPosition={false}
            complete={true}
          />
        );
      })}
    </div>
  );
}
