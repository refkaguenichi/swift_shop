import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "./../constants/userCanstants";

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
