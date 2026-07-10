import Card from "react-bootstrap/esm/Card";

export default function Task({
  text,
  details,
  showPosition,
  showButtons,
  showDetails,
}) {
  let cardClass = "py-3 mx-2 mx-lg-5";
  if (showButtons) {
    cardClass = "pt-3 mx-2 mx-lg-5";
  }
  return (
    <Card className={cardClass}>
      {showPosition ? (
        <Card.Title className="text-start px-3">#1</Card.Title>
      ) : null}
      <Card.Text className="text-start px-3">{text}</Card.Text>

      {showDetails ? <div className="text-end px-3">{details}</div> : null}
      {showButtons ? (
        <Card.Footer className="text-end">⬆️ ⬇️ 🗑️</Card.Footer>
      ) : null}
    </Card>
  );
}
