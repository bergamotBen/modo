import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function StreakDetail({ title, value }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Typography textAlign="left">
          {title}: {value} days
        </Typography>
      </CardContent>
    </Card>
  );
}
