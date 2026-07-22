import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function AddTask({ showModal, handleClose, userId }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshTasks } = useTasks();

  const handleCancel = () => {
    setContent("");
    handleClose();
  };
  const handleAddTask = async () => {
    if (!userId) {
      alert("You need to log in to add a task");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("tasks").insert([
      {
        task: content,
        user: userId,
        complete: false,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(`Something's gone wrong: ${error.message}`);
    } else {
      setContent("");
      refreshTasks();
      handleClose();
    }
  };

  const handleSubmit = (e, content, userId) => {
    e.preventDefault();
    handleAddTask(content, userId);
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What do you need to do?"
              onKeyDown={handleKeyDown}
              autoFocus
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0 pb-3">
          <Button type="submit" disabled={!content}>
            Add
          </Button>
          <Button onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
