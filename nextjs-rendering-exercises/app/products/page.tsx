type Product = {
  id: number;
  title: string;
};

export default async function ProductsPage() {
  const response = await fetch("https://dummyjson.com/products");

  const data: { products: Product[] } = await response.json();

  const products = data.products.slice(0, 5);

  return (
    <main>
      <h1>Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </main>
  );
}