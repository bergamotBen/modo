import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

export default function ProgressGauge({ today, value }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ textAlign: "center", m: 0, py: 2 }}>
        <Typography variant="h1" sx={{ m: 0 }}>
          {value}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {today ? "TODAY" : "THIS WEEK"}
        </Typography>
      </CardActions>
    </Card>
  );
}
