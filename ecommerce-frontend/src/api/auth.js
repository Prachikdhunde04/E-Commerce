import API from "./axios";

// Signup
export const signup = (userData) => API.post("/auth/signup", userData);

// Login
export const login = (userData) => API.post("/auth/login", userData);
