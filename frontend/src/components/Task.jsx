import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  PlayCircle,
  PauseCircle,
  StopCircle,
  Trash3,
  CheckCircle,
  ExclamationCircle,
} from "react-bootstrap-icons";
import { markAsComplete, markAsIncomplete } from "../services/tasks";

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
}) {
  const [isDone, setIsDone] = useState(task.complete);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useOutletContext();

  useEffect(() => {
    setIsDone(task.complete);
  }, [task.complete]);

  async function handleDone() {
    if (isLoading) return;

    setIsLoading(true);
    const nextState = !isDone;

    try {
      if (nextState) {
        await markAsComplete(userId, task.id);
      } else {
        await markAsIncomplete(userId, task.id);
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
        {...dragAttributes}
        {...dragListeners}
        style={{
          cursor: "grab",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        {showPosition ? (
          <Card.Title className="text-start px-3">{task.priority}</Card.Title>
        ) : null}
        <Card.Text className={textClassName}>{task.task}</Card.Text>

        {showDetails ? (
          <div className="text-end px-3 text-secondary">{details}</div>
        ) : null}
      </div>

      {showButtons ? (
        <Card.Footer
          className="text-end px-2 py-2"
          style={{ position: "relative", zIndex: 10 }}
        >
          {task.active ? (
            buttons.includes("play") ? (
              <Link className="mx-1">
                <PlayCircle size={26} className="text-secondary" />
              </Link>
            ) : (
              <Link className="mx-1">
                <PauseCircle size={26} className="text-secondary" />
              </Link>
            )
          ) : null}

          {buttons.includes("stop") && (
            <Link className="mx-1">
              <StopCircle size={26} className="text-secondary" />
            </Link>
          )}

          {buttons.includes("done") &&
            (isDone ? (
              <CheckCircle
                size={26}
                className="text-secondary"
                style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                onClick={handleDone}
              />
            ) : (
              <ExclamationCircle
                size={26}
                className="text-secondary"
                style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                onClick={handleDone}
              />
            ))}

          {buttons.includes("delete") && (
            <Link className="mx-1">
              <Trash3 size={26} className="text-secondary" />
            </Link>
          )}
        </Card.Footer>
      ) : null}
    </Card>
  );
}
