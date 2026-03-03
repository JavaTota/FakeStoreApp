import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { getAllProducts } from "../services/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProducts();
        setProducts(data);
      } catch (e) {
        setError(e?.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <LoadingSpinner text="Loading products..." />;

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <h2 className="mb-3">Products</h2>
      <Row xs={1} sm={2} lg={4} className="g-3">
        {products.map((p) => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </>
  );
}
