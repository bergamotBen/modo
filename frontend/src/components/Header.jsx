import Container from "react-bootstrap/esm/Container";
import { useEffect } from "react";
import { useTimer } from "../context/TimerContext";

export default function Header({ title }) {
  const { timer } = useTimer();

  useEffect(() => {}, [timer]);

  if (title) {
    return (
      <Container className="text-end mt-2 p-2 px-lg-3">
        <h1>{title}</h1>
      </Container>
    );
  } else {
    return (
      <Container className="text-end mt-2 p-2 px-lg-3 h1">{timer}</Container>
    );
  }
}
