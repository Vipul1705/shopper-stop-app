import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My first Book",
    description: "My first book ever written",
  },
  {
    id: "p2",
    price: 10,
    title: "My 2nd Book",
    description: "My 2nd book ever written",
  },
  {
    id: "p3",
    price: 20,
    title: "My 3rd Book",
    description: "My 3rd book ever written",
  },
];

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await fetch(
      "https://shopper-stop-b5623-default-rtdb.firebaseio.com/products.json"
    );
    if (!response.ok) {
      throw new Error("Could not fetch data");
    }
    const responseData = await response.json();
    let loadedProducts = [];
    for (const key in responseData) {
      loadedProducts.push({
        id: key,
        title: responseData[key].title,
        price: responseData[key].price,
        description: responseData[key].description,
      });
    }
    setProducts(loadedProducts);
  };

  useEffect(() => {
    fetchProducts();
  });
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
