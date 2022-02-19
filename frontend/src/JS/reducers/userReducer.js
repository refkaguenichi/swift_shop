import {
  USER_ADDRESS_MAP_CONFIRM,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REVIEW_CREATE_FAIL,
  USER_REVIEW_CREATE_REQUEST,
  USER_REVIEW_CREATE_RESET,
  USER_REVIEW_CREATE_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_TOPSELLERS_LIST_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "./../constants/userCanstants";

export const userSignUpReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { userInfo: payload, loading: false };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userSignInReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { userInfo: payload, loading: false };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = { loading: true },
  { type, payload }
) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { user: payload, loading: false };
    case USER_DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { user: payload, loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { user: payload, loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const userListReducer = (
  state = { loading: true },
  { type, payload }
) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: payload };
    case USER_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
export const userDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userTopSellerListReducer = (
  state = { loading: true },
  { type, payload }
) => {
  switch (type) {
    case USER_TOPSELLERS_LIST_REQUEST:
      return { loading: true };
    case USER_TOPSELLERS_LIST_SUCCESS:
      return { loading: false, users: payload };
    case USER_TOPSELLERS_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userAddressMapReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADDRESS_MAP_CONFIRM:
      return { address: action.payload };
    default:
      return state;
  }
};

export const userReviewCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case USER_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: payload };
    case USER_REVIEW_CREATE_FAIL:
      return { loading: false, error: payload };
    case USER_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
