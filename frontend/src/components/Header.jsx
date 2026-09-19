import Container from "react-bootstrap/esm/Container";
import { useTimer } from "../context/TimerContext";
import { useState, useEffect } from "react";

function Timer() {
  const { timer } = useTimer();
  return timer > 0 ? timer : null;
}
export default function Header({ title }) {
  if (title) {
    return (
      <Container className="text-end mt-2 p-2 px-lg-3">
        <h1>{title}</h1>
      </Container>
    );
  } else {
    return (
      <Container className="text-end mt-2 p-2 px-lg-3 h1">
        <Timer />
      </Container>
    );
  }
}
