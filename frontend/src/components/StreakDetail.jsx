import { useEffect, useState } from "react";
import Card from "react-bootstrap/esm/Card";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function StreakDetail({ type }) {
  const { userId } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const title = type === "current_streak" ? "Current" : "Longest";

  useEffect(() => {
    async function fetchStreak() {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_task_streaks")
        .select(type)
        .eq("user", userId)
        .single();

      if (error) {
        console.error(error);
      } else if (data) {
        setValue(data[type]);
      }
      setLoading(false);
    }
    if (userId) {
      fetchStreak();
    }
  }, [userId]);
  return (
    <Card>
      <Card.Body className="h1 text-center m-0">
        {value} {value === 1 ? "day" : "days"}
      </Card.Body>
      <Card.Footer className="text-center">{title} streak</Card.Footer>
    </Card>
  );
}
