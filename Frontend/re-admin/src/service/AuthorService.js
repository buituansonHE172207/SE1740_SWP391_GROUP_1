import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/author";

const getAllAuthors = () => {
    return axios.get(API_URL);
}

const deleteAuthor = (authorId) => {
    return axios.delete(API_URL + '/' + authorId);
}

const updateAuthor = (data) => {
    return axios.put(API_URL, data);
}

const getAuthorById = (authorId) => {
    return axios.get(API_URL + '/' + authorId);
}

const addAuthor = (data) => {
    return axios.post(API_URL, data);
}

export {getAllAuthors, deleteAuthor, updateAuthor, getAuthorById, addAuthor};