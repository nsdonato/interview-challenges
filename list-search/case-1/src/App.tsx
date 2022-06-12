import {useEffect, useState, useMemo} from "react";
import type {Product} from "./types";
import api from "./api";

enum OrderType {
  PRICE = 'price',
  ALPHA = 'alphabetically',
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(() => localStorage.getItem('query') || "");
  const [order, setOrder] = useState<OrderType>(() => localStorage.getItem('order') as OrderType  || OrderType.PRICE);

  useEffect(() => {
    api.search(query).then(data => setProducts(data));
    localStorage.setItem('query', query);
  }, [query]);

  useMemo(() => {
    const orderedProducts = products.sort((a, b) => {
      if (order === OrderType.PRICE) {
        return a.price - b.price;
      }
      return a.title.localeCompare(b.title);
    })

    setProducts(orderedProducts);
    localStorage.setItem('order', order);
  },[order, products])

  const handleSelect = (orderValue: string) => {
     setOrder(orderValue as OrderType);
  };

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} value={query} />
      <select onChange={(e) => handleSelect(e.target.value)} value={order}>
        <option value={OrderType.PRICE}>Precio</option>
        <option value={OrderType.ALPHA}>Alfabeticamente</option>
      </select>
      <ul>
        {products.length > 0 ?
          products.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}</span>
          </li>
        ))
        : <span>Cargando..</span>
      }
      </ul>
    </main>
  );
}

export default App;
