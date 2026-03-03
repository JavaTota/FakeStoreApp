import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={product.image} alt={product.title} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{product.title}</Card.Title>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="fw-semibold">${Number(product.price).toFixed(2)}</div>
          <Button
            as={Link}
            to={`/products/${product.id}`}
            size="sm"
            variant="primary"
          >
            View
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
