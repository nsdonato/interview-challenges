import type {Product} from "./types";

import {useEffect, useState} from "react";

import api from "./api";

function Recommended () {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.search().then(data => {
      const recommendedProducts = [...data]
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .slice(0, 2)

      setProducts(recommendedProducts)
    });
  }, []);

  return (
    <main>
      <h1>Productos recomendados</h1>
      <ul>
        {products
          .map((product) => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))}
      </ul>
    </main>
  );
}

const useDebounce = (value: string, ms: number) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(value);
    }, ms);

    return () => {
      clearTimeout(timerId);
    }
  }, [value, ms]);

  return debounced
}


function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedValues = localStorage.getItem("products");
    return storedValues ? JSON.parse(storedValues) : [];
  });

  const [query, setQuery] = useState<string>("");

  const queryDebounced = useDebounce(query, 500);

  useEffect(() => {
    if(!products.length) {
      api.search(queryDebounced).then(setProducts);
    }
  }, [queryDebounced]);

  const handleChangeQuery = (valueQuery: string) => {
    setQuery(valueQuery);
  }
  const handleAddToFavorite = (id: number) => {
    const favProducts: Product[] = products.map((product: Product) => product.id === id ? {...product, favorite: !product.favorite} : product);
    localStorage.setItem('products', JSON.stringify(favProducts));
    setProducts(favProducts);
  }

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => handleChangeQuery(e.target.value)} />
      <ul>
        {products.map((product) => (
          <li className={product.favorite ? 'fav' : ''} key={product.id} onClick={() => handleAddToFavorite(product.id)}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>$ {product.price}</span>
          </li>
        ))}
      </ul>
      <hr />
      <Recommended />
    </main>
  );
}

export default App;
