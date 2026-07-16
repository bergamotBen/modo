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
  taskId,
  text,
  details,
  buttons,
  showPosition,
  showButtons,
  showDetails,
  active,
  priority,
  complete,
  dragAttributes,
  dragListeners,
  onStatusChange,
}) {
  const [isDone, setIsDone] = useState(complete);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useOutletContext();

  useEffect(() => {
    setIsDone(complete);
  }, [complete]);

  async function handleDone() {
    if (isLoading) return;

    setIsLoading(true);
    const nextState = !isDone;
    // 👇 ADD THESE LOGS FOR DEBUGGING
    console.log("--- handleDone Triggered ---");
    console.log("userId extracted from Context:", userId);
    console.log("taskId passed to Task component:", taskId);
    console.log("Attempting to change status to complete =", nextState);
    try {
      if (nextState) {
        const res = await markAsComplete(userId, taskId);
        console.log("Supabase response (Complete):", res);
      } else {
        const res = await markAsIncomplete(userId, taskId);
        console.log("Supabase response (Incomplete):", res);
      }
      setIsDone(nextState);

      if (onStatusChange) {
        onStatusChange(taskId);
      }
    } catch (error) {
      console.error("Failed to update task status:", error);
      console.error("CRITICAL: Failed to update task status:", error);
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

  if (active) {
    border = "success";
    textClassName += " text-success";
  }

  return (
    <Card
      border={border}
      className={cardClass}
      style={{ opacity: isLoading ? 0.7 : 1 }}
    >
      {/*
        This upper div catches the drag events.
        It allows you to drag using the task body without conflicting with the buttons below.
      */}
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
          <Card.Title className="text-start px-3">{priority}</Card.Title>
        ) : null}
        <Card.Text className={textClassName}>{text}</Card.Text>

        {showDetails ? (
          <div className="text-end px-3 text-secondary">{details}</div>
        ) : null}
      </div>

      {showButtons ? (
        <Card.Footer
          className="text-end px-2 py-2"
          style={{ position: "relative", zIndex: 10 }}
        >
          {active ? (
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
