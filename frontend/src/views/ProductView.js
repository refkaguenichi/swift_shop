import React, { useEffect, useState } from "react";
import Rating from "./../components/Rating";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBox from "./../components/LoadingBox";
import MessageBox from "./../components/MessageBox";
import { createReview, detailsProduct } from "../JS/actions/productActions";
import { PRODUCT_REVIEW_CREATE_RESET } from "../JS/constants/productConstants";

const ProductView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger" error={error} />
      ) : (
        <>
          <Link to="/" className="fa fa-arrow-circle-left primary go-back">
            Back to home
          </Link>
          <div
            className="rows top"
            style={{ margin: "0 auto" }}
            key={product._id}
          >
            <div className="product-col-2">
              <img
                className="large"
                src={product.image && `/uploads/${product.image}`}
                alt={product.name}
              />
            </div>
            <div className="product-col-1">
              <ul className="details">
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
                  Seller:
                  <Link to={`/seller/${product.seller._id}`}>
                    {product.seller.seller.name || product.seller.name}
                  </Link>
                  <Rating
                    rating={product.seller.seller.rating}
                    numReviews={product.seller.seller.numReviews}
                  />
                </li>
                <li>
                  <h3>Price : ${product.price}</h3>
                </li>
                <li>
                  <p> Description:{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="product-col-1">
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
          <div className="reviews">
            <h2 id="reviews">Reviews</h2>
            <ul>
              {product.reviews.length !== 0 ? (
                product.reviews.map((review) => (
                  <li key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} caption=" " />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))
              ) : (
                <MessageBox variant="info" reviews={product.reviews.length} />
              )}
              <li>
                {userInfo && (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox />}
                      {errorReviewCreate ? (
                        <MessageBox
                          variant="danger"
                          errorReviewCreate={errorReviewCreate}
                        />
                      ) : (
                        successReviewCreate && (
                          <MessageBox
                            variant="success"
                            successReviewCreate={!errorReviewCreate}
                          />
                        )
                      )}
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default ProductView;
