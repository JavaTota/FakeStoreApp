import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 15000,
});

export async function getAllProducts() {
  const { data } = await api.get("/products");
  return data;
}

export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function createProduct(payload) {
  const { data } = await api.post("/products", payload);
  return data;
}

export async function updateProduct(id, payload) {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}
