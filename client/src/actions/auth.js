import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    //Login the user
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: data });
    //   Push to the homepage
    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    //SignUp the user
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, payload: data });
    //   Push to the homepage
    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};
