import Task from "../components/Task";
import Header from "../components/Header";
export default function Tasks() {
  return (
    <>
      <Header title="TODO" />
      <Task
        text="An incomplete task"
        details="July 17th"
        showButtons={true}
        showDetails={false}
        showPosition={true}
      />
    </>
  );
}
