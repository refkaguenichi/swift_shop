import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_TOP_LIST_REQUEST,
  PRODUCT_TOP_LIST_SUCCESS,
  PRODUCT_TOP_LIST_FAIL,
} from "./../constants/productConstants";

// export const listProducts = () => async (dispatch) => {
//   dispatch({
//     type: PRODUCT_LIST_REQUEST,
//   });
//   try {
//     const { data } = await axios.get("/api/products");
//     dispatch({
//       type: PRODUCT_LIST_SUCCESS,
//       payload: data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PRODUCT_LIST_FAIL,
//       payload: err.message,
//     });
//   }
// };

export const listProducts =
  ({
    pageNumber,
    seller = "",
    name = "",
    category = "",
    order = "",
    min = 0,
    max = 0,
    rating = 0,
  }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `/api/products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const listTopProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_TOP_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/products/top-products");
    dispatch({ type: PRODUCT_TOP_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_TOP_LIST_FAIL, payload: message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST, payload: product });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post("/api/products/", product, {
      headers: { Authorization: `${userInfo.token}` },
    });
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    await axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};

export const createReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: { Authorization: `${userInfo.token}` },
        }
      );
      dispatch({
        type: PRODUCT_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
    }
  };
