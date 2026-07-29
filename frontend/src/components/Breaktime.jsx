import { Button } from "react-bootstrap";
import Card from "react-bootstrap/esm/Card";
import { useTimer } from "../context/TimerContext";

export default function Breaktime({ userId }) {
  const { startBreakTimer, onBreak, onLongBreak } = useTimer();
  function handleStartBreak() {
    startBreakTimer(userId);
  }
  return (
    <Card border="danger" className="py-3 mx-2 mb-3 mx-lg-5">
      <Card.Title className="text-end px-3 text-danger">BREAK</Card.Title>
      <Card.Text className="px-3 d-flex justify-content-between align-items-center">
        {onLongBreak ? (
          <span>
            {onBreak ? "My OOO is on." : "This is the BIG one. Enjoy it."}
          </span>
        ) : (
          <span>{onBreak ? "My OOO is on." : "Enjoy it."}</span>
        )}
        <Button
          className="ms-auto"
          onClick={handleStartBreak}
          variant={"outline-danger"}
          size="sm"
          disabled={onBreak}
        >
          {onLongBreak
            ? onBreak
              ? "... taking a cool 30"
              : "I'm ready to kick back..."
            : onBreak
              ? "...taking a hot 5"
              : "scroll scroll scroll"}
        </Button>
      </Card.Text>
    </Card>
  );
}
