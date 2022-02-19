import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { createReview, detailsUser } from "../JS/actions/userActions";
import { listProducts } from "../JS/actions/productActions";
import { USER_REVIEW_CREATE_RESET } from "../JS/constants/userCanstants";

const Seller = (props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const params = useParams();
  const { id: sellerId } = params;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;
  const userReviewCreate = useSelector((state) => state.userReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = userReviewCreate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: USER_REVIEW_CREATE_RESET });
    }
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId, successReviewCreate]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(sellerId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };
  return (
    <div className="rows top">
      <div className="col-1">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger" errorSeller={error} />
        ) : (
          <>
            <ul className="card card-body">
              <li>
                <div className="row start">
                  <div className="p-1">
                    <img
                      className="small"
                      src={user.seller.logo}
                      alt={user.seller.name}
                    ></img>
                  </div>
                  <div className="p-1">
                    <h1>{user.seller.name}</h1>
                  </div>
                </div>
              </li>
              <li>
                <Rating
                  rating={user.seller.rating}
                  numReviews={user.seller.numReviews}
                />
              </li>
              <li>
                <a href={`mailto:${user.email}`}>Contact Seller</a>
              </li>
              <li>{user.seller.description}</li>
            </ul>
            <div className="reviews">
              <h2 id="reviews">Reviews</h2>
              <ul>
                {user.seller.reviews.length !== 0 ? (
                  user.seller.reviews.map((review) => (
                    <li key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} caption=" " />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </li>
                  ))
                ) : (
                  <MessageBox
                    variant="info"
                    reviews={user.seller.reviews.length}
                  />
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
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <LoadingBox />
        ) : errorProducts ? (
          <MessageBox variant="danger" errorProductsSeller={errorProducts} />
        ) : (
          <>
            {products.length === 0 && (
              <MessageBox variant="info" sellerProducts={products.length} />
            )}
            <div className="rows center">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Seller;
