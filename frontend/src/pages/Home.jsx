import Header from "../components/Header";
import Task from "../components/Task";

export default function Home() {
  return (
    <div>
      <Header />
      <Task
        text="No position and no buttons"
        showPosition={false}
        showDetails={false}
        showButtons={false}
      />
    </div>
  );
}
