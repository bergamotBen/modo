import { CSS } from "@dnd-kit/utilities";
import Task from "../components/Task";
import { useSortable } from "@dnd-kit/sortable";

export default function SortableTask({ id, task, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Task
        taskId={task.id}
        task={task}
        showButtons={true}
        showDetails={false}
        showPosition={true}
        buttons={["done", "delete"]}
        dragAttributes={attributes}
        dragListeners={listeners}
        onStatusChange={onRemove}
        isDraggable={true}
      />
    </div>
  );
}
