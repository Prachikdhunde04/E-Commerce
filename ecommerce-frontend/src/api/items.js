import API from "./axios";

// Get all items (with filters if needed)
export const getItems = (filters = {}) => API.get("/items", { params: filters });
