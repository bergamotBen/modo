import Card from "react-bootstrap/esm/Card";

export default function StreakDetail({ title, value }) {
  return (
    <Card>
      <Card.Text className="text-start p-3">
        {title}: {value} days
      </Card.Text>
    </Card>
  );
}
