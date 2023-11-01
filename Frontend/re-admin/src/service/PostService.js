import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/post";

const getAllPosts = () => {
    return axios.get(API_URL);
}

const getPostById = (id) => {
    return axios.get(API_URL + '/' + id);
}

const createPost = (data) => {
    return axios.post(API_URL, data);
}

const updatePost = (data) => {
    return axios.put(API_URL, data);
}

const deletePost = (id) => {
    return axios.delete(API_URL + '/' + id);
}

const getAllPostCategories = () => {
    return axios.get("http://localhost:8081/api/v1/post-category");
}

export { getAllPosts, getPostById, createPost, updatePost, deletePost, getAllPostCategories}