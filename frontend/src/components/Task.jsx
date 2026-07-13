import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Task({
  text,
  details,
  showPosition,
  showButtons,
  showDetails,
  active,
  priority,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        py: showButtons ? 0 : 1.5,
        pt: showButtons ? 1.5 : undefined,
        mx: { xs: 1, lg: 4 },
        mb: 1.5,
        borderColor: active ? "success.main" : "divider",
      }}
    >
      {showPosition ? (
        <CardContent sx={{ py: 0, px: 2, "&:last-child": { pb: 0 } }}>
          <Typography textAlign="left">{priority}</Typography>
        </CardContent>
      ) : null}
      <CardContent
        sx={{
          py: showPosition ? 1 : 1.5,
          px: 2,
          "&:last-child": { pb: showDetails || showButtons ? 1 : 1.5 },
        }}
      >
        <Typography
          textAlign="left"
          color={active ? "success.main" : "text.primary"}
        >
          {text}
        </Typography>
      </CardContent>

      {showDetails ? (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="right"
          sx={{ px: 2, pb: 1 }}
        >
          {details}
        </Typography>
      ) : null}
      {showButtons ? (
        <CardActions sx={{ justifyContent: "flex-end", py: 0, px: 1 }}>
          <Button
            variant="text"
            color="inherit"
            sx={{ color: "text.secondary" }}
          >
            ...
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
