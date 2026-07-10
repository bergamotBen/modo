import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

export default function Task({
  text,
  details,
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
        <Card.Footer className="text-end px-2 py-0">
          <Button variant="Link" className="text-secondary">
            ...
          </Button>
        </Card.Footer>
      ) : null}
    </Card>
  );
}
