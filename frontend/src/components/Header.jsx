import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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
      <Container sx={{ textAlign: "right", mt: 1, p: 1, px: { lg: 2 } }}>
        <Typography variant="h1">{title}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ textAlign: "right", mt: 1, p: 1, px: { lg: 2 } }}>
      <Typography variant="h1" component="div">
        <Timer />
      </Typography>
    </Container>
  );
}
