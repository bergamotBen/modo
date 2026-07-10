import Card from "react-bootstrap/esm/Card";

export default function ProgressGauge({ today, value }) {
  return (
    <Card>
      <Card.Body className="h1 text-center m-0">{value}</Card.Body>
      {today ? (
        <Card.Footer className="text-center">TODAY</Card.Footer>
      ) : (
        <Card.Footer className="text-center">THIS WEEK</Card.Footer>
      )}
    </Card>
  );
}
