import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(loginFailure());
  }
};

export const logout = (dispatch) => {
  dispatch(logoutStart());

  try {
    dispatch(logoutSuccess);
  } catch (error) {
    dispatch(logoutFailure);
  }
}