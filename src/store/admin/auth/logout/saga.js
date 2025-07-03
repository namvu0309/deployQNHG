// src/store/auth/logout/saga.js
import { put, takeEvery } from "redux-saga/effects";
import { LOGOUT_USER, LOGOUT_USER_SUCCESS } from "@store/admin/auth/login/actionTypes.js";

function* handleLogout(action) {
    // Xoá token khỏi localStorage
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    // Dispatch success nếu bạn cần reset reducer
    yield put({ type: LOGOUT_USER_SUCCESS });

    // Gọi callback (navigate về login)
    if (typeof action.payload?.callback === "function") {
        action.payload.callback();
    }
}

export default function* LogoutSaga() {
    yield takeEvery(LOGOUT_USER, handleLogout);
}
