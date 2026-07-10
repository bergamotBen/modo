import Header from "../components/Header";
import Task from "../components/Task";
import Breaktime from "../components/Breaktime";
import { useState } from "react";

export default function Home() {
  const [breaktime, setBreaktime] = useState(true);
  return (
    <div>
      <Header />
      {breaktime ? <Breaktime /> : null}
      <Task
        text="An in-progress task with no position and no buttons"
        showPosition={false}
        showDetails={false}
        showButtons={false}
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
