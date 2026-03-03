import Spinner from "react-bootstrap/Spinner";

export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="d-flex flex-column align-items-center py-5">
      <Spinner animation="border" role="status" />
      <div className="text-muted mt-3">{text}</div>
    </div>
  );
}
