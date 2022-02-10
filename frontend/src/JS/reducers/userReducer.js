import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
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

export const userDetailsReducer = (state = {}, { type, payload }) => {
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
