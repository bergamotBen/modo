import Header from "../components/Header";
import Task from "../components/Task";
import Breaktime from "../components/Breaktime";
import { useState } from "react";

export default function Home() {
  const [breaktime, setBreaktime] = useState(false);
  return (
    <div>
      <Header />
      {breaktime ? <Breaktime /> : null}
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
