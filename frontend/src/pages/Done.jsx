import Task from "../components/Task";
import Header from "../components/Header";
export default function Done() {
  return (
    <>
      <Header title="DONE" />

      <Task
        text="A task marked as done"
        details="July 17th ☑️"
        showButtons={false}
        showDetails={true}
        showPosition={false}
      />
    </>
  );
}
