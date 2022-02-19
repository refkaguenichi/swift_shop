import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Card } from "react-bootstrap";

const product = ({ product }) => {
  return (
    <Card
      style={{ width: "25rem", margin: "1rem auto" }}
      key={product._id}
      className="product"
    >
      <Link to={`/products/${product._id}`}>
        <Card.Img
          variant="top"
          src={product.image && `/uploads/${product.image}`}
          alt={product.name}
        />
        <Card.Body>
          <Card.Title>
            {" "}
            <h1>{product.name}</h1>
          </Card.Title>
          <Card.Text>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <span>Price:${product.price}</span>{" "}
            <Link to={`/products/${product._id}`}> More details...</Link>
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default product;
