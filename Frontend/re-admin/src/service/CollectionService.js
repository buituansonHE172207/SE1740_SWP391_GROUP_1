import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/book-collection";

const getAllCollections = () => {
    return axios.get(API_URL);
};

export {getAllCollections};