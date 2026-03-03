import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function DeleteModal({
  show,
  onHide,
  onConfirm,
  title = "Delete product?",
  body = "This action cannot be undone.",
  loading = false,
}) {
  return (
    <Modal show={show} onHide={loading ? undefined : onHide} centered>
      <Modal.Header closeButton={!loading}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-muted">{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
