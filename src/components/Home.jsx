import React from "react";
import "./styles.css";
import { CartState } from "../context/Context";

// components
import Filter from "./Filter";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { products },
    filterState: { byStock, byFastDelivery, sort, byRating, searchQuery },
  } = CartState();
  console.log(products);

  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (!byStock) {
      sortedProducts = sortedProducts.filter((product) => product.inStock);
    }
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter(
        (product) => product.byFastDelivery
      );
    }
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (product) => product.ratings >= byRating
      );
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedProducts;
  };
  return (
    <>
      <div className="home">
        <Filter />
        <div className="productContainer">
          {transformProducts().map((product) => {
            return <SingleProduct product={product} key={product.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
