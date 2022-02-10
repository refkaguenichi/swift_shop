import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const product = ({ product }) => {
  return (
    <div key={product._id}>
      <Link to={`/products/${product._id}`}>
        <img src={`/uploads/${product.image}`} alt={product.name} />
      </Link>
      <h1>{product.name}</h1>
      <Rating rating={product.rating} numReviews={product.numReviews} />
      <span>Price:${product.price}</span>
    </div>
  );
};

export default product;
