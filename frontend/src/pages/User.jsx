import Header from "../components/Header";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProgressGauge from "../components/ProgressGauge";
import StreakDetail from "../components/StreakDetail";

export default function User() {
  return (
    <>
      <Header title="USER" />
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
