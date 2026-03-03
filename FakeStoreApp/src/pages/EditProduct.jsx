import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import { getProductById, updateProduct } from "../services/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setErr("");

        const data = await getProductById(id);

        setForm({
          title: data.title ?? "",
          price: data.price ?? "",
          description: data.description ?? "",
          category: data.category ?? "",
        });
      } catch (e) {
        setErr(e?.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

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
      setSaving(true);
      const payload = {
        title: form.title.trim(),
        price,
        description: form.description.trim(),
        category: form.category.trim(),
        image: "https://i.pravatar.cc",
      };
      await updateProduct(id, payload);
      setMsg("Product updated (mock API).");
      setTimeout(() => navigate(`/products/${id}`), 700);
    } catch (e2) {
      setErr(e2?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingSpinner text="Loading product..." />;

  return (
    <>
      <h2 className="mb-3">Edit Product</h2>

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
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                value={form.price}
                onChange={onChange}
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
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => navigate(-1)}
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
