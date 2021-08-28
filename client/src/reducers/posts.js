import {
  FETCH_ALL,
  UPDATE,
  DELETE,
  CREATE,
  LIKE,
} from "../constants/actionTypes";
const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE:
    case LIKE:
      // Return the new post
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case CREATE:
      return [...posts, action.payload];
    default:
      return posts;
  }
};

export default reducer;
