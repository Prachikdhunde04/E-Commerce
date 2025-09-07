export async function fetchProducts() {
  const response = await fetch(
    "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"
  );
  const data = await response.json();
  return data;
}
