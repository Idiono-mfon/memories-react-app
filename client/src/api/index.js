import axios from "axios";
//const url = "http://localhost:5000/posts";
const instance = axios.create({ baseURL: "http://localhost:5000" });
//const instance = axios.create({ baseURL: "https://momerisapp.herokuapp.com" });
// /posts

// Specify interceptors
instance.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => instance.get("/posts");
export const createPost = (newPost) => instance.post("/posts", newPost);
export const updatePost = (id, newPost) =>
  instance.patch(`/posts/${id}`, newPost);
export const deletePost = (id) => instance.delete(`/posts/${id}`);
export const likePost = (id) => instance.patch(`/posts/${id}/likePost`);
//export const fetchPosts = () => axios.get(url);
export const signIn = (formData) => instance.post("/auth/signin", formData);
export const signUp = (formData) => instance.post("/auth/signup", formData);
