import Container from "react-bootstrap/esm/Container";
import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          return "DONE";
        }
        return prevTime - 1;
      });
    }, 60000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);
  return time;
}
export default function Header({ title }) {
  if (title) {
    return (
      <Container className="text-end p-2 px-lg-3">
        <h1>{title}</h1>
      </Container>
    );
  } else {
    return (
      <Container className="text-end p-2 px-lg-3">
        <h3>
          <Timer />
        </h3>
      </Container>
    );
  }
}
