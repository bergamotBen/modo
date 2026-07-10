import Container from "react-bootstrap/esm/Container";
import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval);
          return <br />;
        }
        return prevTime - 1;
      });
    }, 3000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);
  return time;
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
