import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
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
import { getTasks } from "../services/tasks";

function SortableTask({ id, task, onRemove }) {
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
        text={task.task}
        showButtons={true}
        showDetails={false}
        showPosition={true}
        priority={task.priority}
        buttons={["done", "delete"]}
        active={false}
        complete={task.complete}
        dragAttributes={attributes}
        dragListeners={listeners}
        onStatusChange={onRemove}
      />
    </div>
  );
}

export default function Tasks() {
  const { userId } = useOutletContext();
  const [taskList, setTaskList] = useState([]);

  const handleRemoveTask = (idToRemove) => {
    setTaskList((prevList) =>
      prevList.filter((task) => task.id !== idToRemove),
    );
  };

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

  useEffect(() => {
    async function loadTasks() {
      try {
        const allTasks = await getTasks(userId, {
          complete: false,
          orderBy: "priority",
          ascending: true,
        });
        setTaskList(allTasks);
      } catch (error) {
        console.error(`Failed to load tasks: ${error}`);
      }
    }
    if (userId) loadTasks();
  }, [userId]);

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
            {taskList.map((task) => (
              <SortableTask
                key={task.id}
                id={task.id}
                task={task}
                onRemove={handleRemoveTask}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
}
