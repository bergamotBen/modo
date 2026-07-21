import Card from "react-bootstrap/esm/Card";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useOutletContext } from "react-router-dom";

export default function ProgressGauge({ today }) {
  const [stats, setStats] = useState(0);
  const [loading, setLoading] = useState(true);
  const { userId } = useOutletContext();

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const range = today ? "today_count" : "week_count";
      const { data, error } = await supabase
        .from("user_task_stats")
        .select(range)
        .eq("user", userId)
        .maybeSingle();

      if (error) {
        console.error(`Error fetching ${range}: ${error}`);
      } else if (data) {
        console.log(data);
        setStats(data[range]);
      }
      setLoading(false);
    }
    if (userId) {
      fetchStats();
    }
  }, [userId]);
  return (
    <Card>
      <Card.Body className="h1 text-center m-0">{stats}</Card.Body>
      {today ? (
        <Card.Footer className="text-center">TODAY</Card.Footer>
      ) : (
        <Card.Footer className="text-center">THIS WEEK</Card.Footer>
      )}
    </Card>
  );
}
