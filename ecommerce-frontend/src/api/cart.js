import API from "./axios";

const token = localStorage.getItem("token");
if (!token) return <p>Please login to view your cart.</p>;
// Fetch the cart (temporary: no auth for testing)
export const getCart = async () => {
  const res = await API.get("/cart"); // backend route: GET /api/cart
  return res;
};

// Remove an item from the cart
export const removeFromCart = async (itemId) => {
  const res = await API.delete(`/cart/${itemId}`); // backend route: DELETE /api/cart/:itemId
  return res;
};

