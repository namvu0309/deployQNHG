import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
} from "./actionTypes";

// --- LOGIN ---
export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

// --- LOGOUT (SAGA sẽ xử lý) ---
export const logoutUser = (callback) => ({
  type: LOGOUT_USER,
  payload: { callback }, // 👈 truyền callback để navigate về login
});

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

export const apiError = (error) => ({
  type: API_ERROR,
  payload: error,
});

export const socialLogin = (type, history) => ({
  type: SOCIAL_LOGIN,
  payload: { type, history },
});
