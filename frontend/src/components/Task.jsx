import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  PlayCircle,
  PauseCircle,
  StopCircle,
  Trash3,
} from "react-bootstrap-icons";
import {
  markAsComplete,
  markAsIncomplete,
  archiveTask,
} from "../services/tasks";
import { Button } from "react-bootstrap";
import { useToast } from "../context/ToastContext";
import { useTimer } from "../context/TimerContext";

export default function Task({
  buttons,
  showPosition,
  showButtons,
  showDetails,
  dragAttributes,
  dragListeners,
  onStatusChange,
  task,
  details,
  isDraggable = false,
}) {
  const [isDone, setIsDone] = useState(task.complete);
  const [isArchived, setIsArchived] = useState(task.archived);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { userId } = useOutletContext();
  const { showToast } = useToast();
  const { timerRunning, pauseTimer, startTimer, timer, stopTimer } = useTimer();

  useEffect(() => {
    setIsDone(task.complete);
  }, [task.complete]);

  function toggleTimer() {
    if (timerRunning) {
      setTimeRemaining(timer);
      pauseTimer();
    } else {
      if (timeRemaining === 0) {
        startTimer(task.id, userId, 25);
      } else {
        startTimer(task.id, timeRemaining);
        setTimeRemaining(0);
      }
    }
  }

  function handleStopTimer() {
    stopTimer();
  }
  async function handleDone() {
    if (isLoading) return;

    setIsLoading(true);
    const nextState = !isDone;

    try {
      if (nextState) {
        await markAsComplete(userId, task.id);
        showToast("Moved to DONE");
      } else {
        await markAsIncomplete(userId, task.id);
        showToast("Moved to TODO");
      }
      setIsDone(nextState);

      if (onStatusChange) {
        onStatusChange(task.id);
      }
    } catch (error) {
      console.error("Failed to update task status:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    setIsLoading(true);

    try {
      if (!isArchived) {
        await archiveTask(userId, task.id);
        setIsArchived(true);

        if (onStatusChange) {
          onStatusChange(task.id);
        }
      }
    } catch (error) {
      console.error("Failed to archive task:", error);
    } finally {
      setIsLoading(false);
      showToast("Task deleted");
    }
  }

  let cardClass = "py-3 mx-2 mx-lg-5 mb-3";
  let border = "";
  let textClassName = "text-start px-3";

  if (showButtons) {
    cardClass = "pt-3 mx-2 mx-lg-5 mb-3";
  }

  if (task.active) {
    border = "success";
    textClassName += " text-success";
  }

  return (
    <Card
      border={border}
      className={cardClass}
      style={{ opacity: isLoading ? 0.7 : 1 }}
    >
      <div
        {...(isDraggable ? dragAttributes : {})}
        {...(isDraggable ? dragListeners : {})}
        style={{
          cursor: isDraggable ? "grab" : "default",
          userSelect: isDraggable ? "none" : "auto",
          touchAction: isDraggable ? "none" : "auto",
        }}
      >
        {showPosition ? (
          <Card.Title className="text-start px-3">{task.priority}</Card.Title>
        ) : null}
        <Card.Text className={textClassName}>{task.task}</Card.Text>

        {showDetails ? (
          <div className="text-end px-3 pt-2 mb-2 text-secondary">
            {details}
          </div>
        ) : null}
      </div>
      {showButtons ? (
        <Card.Footer
          className="d-flex align-items-center justify-content-end mt-2 p-2"
          style={{ position: "relative", zIndex: 10 }}
        >
          {task.active && buttons.includes("play") && (
            <Link className="mx-1">
              {timerRunning ? (
                <PauseCircle
                  size={26}
                  className="text-secondary"
                  onClick={toggleTimer}
                />
              ) : (
                <PlayCircle
                  size={26}
                  className="text-secondary"
                  onClick={toggleTimer}
                />
              )}
            </Link>
          )}

          {buttons.includes("stop") && (
            <Link className="mx-1">
              <StopCircle
                size={26}
                className="text-secondary"
                onClick={handleStopTimer}
              />
            </Link>
          )}

          {buttons.includes("done") && (
            <Button
              id={`task-toggle-${task.id}`}
              variant={"outline-secondary"}
              disabled={isLoading}
              onClick={handleDone}
              size="sm"
            >
              {isDone ? "mark as todo" : "mark as done"}
            </Button>
          )}
          {buttons.includes("delete") && (
            <Link className="mx-1">
              <Trash3
                size={26}
                onClick={handleDelete}
                className="text-secondary"
              />
            </Link>
          )}
        </Card.Footer>
      ) : null}
    </Card>
  );
}
