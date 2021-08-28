import {
  FETCH_ALL,
  UPDATE,
  DELETE,
  CREATE,
  LIKE,
} from "../constants/actionTypes";
import * as api from "../api";
// Action creators
// export const getPosts = () => {
//   const action = { type: "FETCH_ALL", payload: [] };
//   return action;
// };
// (store, dispatch, getState) => {
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    // console.log(id, post);
    const { data } = await api.updatePost(id, post);
    //console.log(data);
    return dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    return dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    return dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// export default getPosts;
