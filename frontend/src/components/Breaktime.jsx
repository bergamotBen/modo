import Card from "react-bootstrap/esm/Card";

export default function Breaktime() {
  return (
    <Card border="danger" className="py-3 mx-2 mb-3 mx-lg-5">
      <Card.Title className="text-end px-3 text-danger">BREAK</Card.Title>
      <Card.Text className="text-start px-3 text-danger">Enjoy it.</Card.Text>
    </Card>
  );
}
