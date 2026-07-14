import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "../components/Task";
import Header from "../components/Header";

function SortableTask({ id, text, priority }) {
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
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "none",
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task
        text={text}
        showButtons={false}
        showDetails={false}
        showPosition={true}
        priority={priority}
        buttons={[]}
        active={false}
      />
    </div>
  );
}

export default function Tasks() {
  const [taskList, setTaskList] = useState([
    { id: "task-1", text: "An incomplete task" },
    { id: "task-2", text: "Another incomplete task" },
    { id: "task-3", text: "A third incomplete task" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTaskList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <Header title="TODO" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="d-flex flex-column gap-2 p-0">
          <SortableContext
            items={taskList.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {taskList.map((task, index) => (
              <SortableTask
                key={task.id}
                id={task.id}
                text={task.text}
                priority={index + 1}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
}
