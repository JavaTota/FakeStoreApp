import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import { createProduct } from "../services/api.js";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setMsg("");

    const price = Number(form.price);
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.category.trim() ||
      Number.isNaN(price)
    ) {
      setErr("Please fill out all fields with valid values.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: form.title.trim(),
        price,
        description: form.description.trim(),
        category: form.category.trim(),
        image: "https://i.pravatar.cc",
      };
      await createProduct(payload);
      setMsg("Product created (mock API).");
      setTimeout(() => navigate("/products"), 700);
    } catch (e2) {
      setErr(e2?.message || "Create failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="mb-3">Add Product</h2>

      {err && <Alert variant="danger">{err}</Alert>}
      {msg && <Alert variant="success">{msg}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Product title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                value={form.price}
                onChange={onChange}
                placeholder="19.99"
                type="number"
                min="0"
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={form.category}
                onChange={onChange}
                placeholder="electronics"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Write a short description..."
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="success" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => navigate("/products")}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
