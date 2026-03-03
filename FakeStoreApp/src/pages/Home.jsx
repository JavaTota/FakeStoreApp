import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero shadow-sm">
      <h1 className="mb-2">FakeStore E-Commerce App</h1>
      <p className="mb-4 text-white-50">
        Browse products, view details, and practice create/update/delete using a
        mock API.
      </p>
      <Button as={Link} to="/products" variant="success">
        Go to Products
      </Button>
    </div>
  );
}
