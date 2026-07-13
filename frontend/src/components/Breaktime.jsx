import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Breaktime() {
  return (
    <Card
      variant="outlined"
      sx={{
        py: 1.5,
        mx: { xs: 1, lg: 4 },
        mb: 1.5,
        borderColor: "error.main",
      }}
    >
      <CardContent sx={{ py: 0, px: 2, "&:last-child": { pb: 0 } }}>
        <Typography textAlign="right" color="error">
          BREAK
        </Typography>
      </CardContent>
      <CardContent sx={{ py: 1, px: 2, "&:last-child": { pb: 1.5 } }}>
        <Typography textAlign="left" color="error">
          Enjoy it.
        </Typography>
      </CardContent>
    </Card>
  );
}
