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
} from "@dnd-kit/sortable";
import SortableTask from "../components/SortableTask";
import Header from "../components/Header";
import { getTasks } from "../services/tasks";
import { supabase } from "../lib/supabase";
import { useTasks } from "../context/TaskContext";

export default function Tasks() {
  const { userId } = useOutletContext();
  const [taskList, setTaskList] = useState([]);
  const { refreshKey } = useTasks();
  const [timeToCompletion, setTimeToCompletion] = useState();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const saveAndSyncPriorities = async (newList) => {
    setTaskList(newList);

    try {
      const updatePromises = newList.map((task, index) =>
        supabase
          .from("tasks")
          .update({ priority: index + 1 })
          .eq("id", task.id)
          .eq("user", userId),
      );

      const results = await Promise.all(updatePromises);
      const firstError = results.find((r) => r.error);
      if (firstError) throw firstError.error;

      await loadTasks();
    } catch (error) {
      console.error("Failed to sync task priorities:", error);
      await loadTasks();
    }
  };

  async function loadTasks() {
    try {
      const allTasks = await getTasks(userId, {
        complete: false,
        active: false,
        orderBy: "priority",
        ascending: true,
        archived: false,
      });
      setTaskList(allTasks);
    } catch (error) {
      console.error(`Failed to load tasks: ${error}`);
    }
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = taskList.findIndex((item) => item.id === active.id);
    const newIndex = taskList.findIndex((item) => item.id === over.id);
    const reorderedList = arrayMove(taskList, oldIndex, newIndex);

    await saveAndSyncPriorities(reorderedList);
  };

  const handleRemoveTask = async (idToRemove) => {
    const filteredList = taskList.filter((task) => task.id !== idToRemove);
    setTaskList(filteredList);
    await loadTasks();
  };

  const calculateTimeToCompletion = (nTasks) => {
    const formatTime = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;

      if (hours === 0) return `${mins}min`;
      if (mins === 0) return `${hours}hr`;
      return `${hours}h ${mins}m`;
    };

    if (nTasks > 3) {
      const longBreaks = Math.floor(nTasks / 4);
      const totalTime = (nTasks + longBreaks) * 30;
      setTimeToCompletion(formatTime(totalTime));
    } else {
      setTimeToCompletion(formatTime(nTasks * 30));
    }
  };

  useEffect(() => {
    if (userId) {
      loadTasks();
    }
  }, [userId, refreshKey]);

  useEffect(() => {
    calculateTimeToCompletion(taskList.length);
  }, [taskList]);

  return (
    <>
      <Header title="TODO" />

      {taskList.length != 0 && (
        <div className="p-2">
          Estimated time to completion: {timeToCompletion}
        </div>
      )}
      {taskList.length === 0 ? (
        <div className="p-2">An empty todo list, such an achiever!</div>
      ) : taskList.length === 1 ? (
        <div className="p-2">You've got an unfinished symphony.</div>
      ) : (
        <div className="p-2">
          You've got {taskList.length} unfinished symphonies.
        </div>
      )}
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
