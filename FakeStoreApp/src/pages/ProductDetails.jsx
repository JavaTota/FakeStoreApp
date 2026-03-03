import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import { deleteProduct, getProductById } from "../services/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import DeleteModal from "../components/DeleteModal.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [info, setInfo] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");
        setInfo("");

        const data = await getProductById(id);
        setProduct(data);
      } catch (e) {
        setError(e?.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  async function handleDelete() {
    try {
      setDeleting(true);
      setInfo("");
      await deleteProduct(id);
      setShowDelete(false);
      navigate("/products", { replace: true });
    } catch (e) {
      setInfo(e?.message || "Delete failed.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <LoadingSpinner text="Loading product..." />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (!product) return <Alert variant="warning">Product not found.</Alert>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
        <div>
          <h2 className="mb-1">Product Details</h2>
          <div className="text-muted small">
            FakeStoreAPI is mock: POST/PUT/DELETE respond as success but do not
            persist.
          </div>
        </div>
        <Button as={Link} to="/products" variant="outline-secondary">
          Back
        </Button>
      </div>

      {info && <Alert variant="warning">{info}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <Row className="g-4">
            <Col md={5}>
              <img
                src={product.image}
                alt={product.title}
                className="w-100 rounded bg-white p-3"
                style={{ objectFit: "contain", maxHeight: 360 }}
              />
            </Col>
            <Col md={7}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge bg="dark">{product.category}</Badge>
                <span className="fw-semibold fs-4">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>

              <h3 className="h5">{product.title}</h3>
              <p className="text-muted">{product.description}</p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <Button
                  variant="success"
                  onClick={() => alert("Added to cart (optional).")}
                >
                  Add to Cart
                </Button>

                <Button
                  as={Link}
                  to={`/edit-product/${product.id}`}
                  variant="primary"
                >
                  Edit
                </Button>

                <Button variant="danger" onClick={() => setShowDelete(true)}>
                  Delete
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <DeleteModal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this product?"
        body="FakeStoreAPI will return success, but the deletion won’t persist after refresh."
      />
    </>
  );
}
