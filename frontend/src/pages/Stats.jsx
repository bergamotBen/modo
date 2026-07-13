import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from "../components/Header";
import ProgressGauge from "../components/ProgressGauge";
import StreakDetail from "../components/StreakDetail";

export default function Stats() {
  return (
    <>
      <Header title="STATS" />
      <Container sx={{ p: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ProgressGauge today={true} value={4} />
          </Grid>
          <Grid item xs={6}>
            <ProgressGauge today={false} value={13} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <StreakDetail title="Current streak" value={2} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <StreakDetail title="Longest streak" value={2} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
