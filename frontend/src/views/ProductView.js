import React, { useEffect, useState } from "react";
import Rating from "./../components/Rating";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBox from "./../components/LoadingBox";
import MessageBox from "./../components/MessageBox";
import { detailsProduct } from "../JS/actions/productActions";

const ProductView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger" error={error} />
      ) : (
        <>
          <Link to="/">Back to home</Link>
          <div className="rows top" key={product._id}>
            <div className="col-2">
              <img
                className="large"
                src={`/uploads/${product.image}`}
                alt={product.name}
              />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>
                  <h1>Price : ${product.price}</h1>
                </li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="rows">
                      <span>Price:</span>
                      <span className="price">${product.price}</span>
                    </div>
                  </li>
                  <li>
                    <div className="rows">
                      <span>Status:</span>
                      <>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="rows">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option value={x + 1}>{x + 1}</option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductView;
