import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
export default function AddTask({ showModal, handleClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Task added");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <Modal show={showModal} onHide={handleClose} className="mt-5">
      <Modal.Header className="border-0 pb-1" closeButton>
        <Modal.Title className="text-secondary">ADD TASK</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="pb-1">
          <Form.Group controlId="taskDescription">
            <Form.Label hidden>Task description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onKeyDown={handleKeyDown}
              autoFocus
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0 pb-3">
          <Button type="submit">Add</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
