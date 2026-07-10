import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Header from "../components/Header";
import ProgressGauge from "../components/ProgressGauge";
import StreakDetail from "../components/StreakDetail";

export default function Stats() {
  return (
    <>
      <Header title="STATS" />
      <Container className="p-0">
        <Row>
          <Col>
            <ProgressGauge today={true} value={4} />
          </Col>
          <Col>
            <ProgressGauge today={false} value={13} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <StreakDetail title="Current streak" value={2} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <StreakDetail title="Longest streak" value={2} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
