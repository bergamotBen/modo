import Task from "../components/Task";
import Header from "../components/Header";
export default function Tasks() {
  return (
    <>
      <Header title="TODO" />
      <Task
        text="An incomplete task"
        showButtons={true}
        showDetails={false}
        showPosition={true}
      />
      <Task
        text="Another incomplete task"
        showButtons={true}
        showDetails={false}
        showPosition={true}
      />
    </>
  );
}
