import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";
import {
  PlayCircle,
  PauseCircle,
  StopCircle,
  Trash3,
  CheckCircle,
} from "react-bootstrap-icons";
// buttons = ['play', 'stop', 'delete', 'complete']
export default function Task({
  text,
  details,
  buttons,
  showPosition,
  showButtons,
  showDetails,
  active,
  priority,
}) {
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
    <Card border={border} className={cardClass}>
      {showPosition ? (
        <Card.Title className="text-start px-3">{priority}</Card.Title>
      ) : null}
      <Card.Text className={textClassName}>{text}</Card.Text>

      {showDetails ? (
        <div className="text-end px-3 text-secondary">{details}</div>
      ) : null}
      {showButtons ? (
        <Card.Footer className="text-end px-2 py-2">
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
