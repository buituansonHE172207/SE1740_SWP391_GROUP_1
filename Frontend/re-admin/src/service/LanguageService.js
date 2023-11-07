import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/language";

const getAllLanguages = () => {
    return axios.get(API_URL);
}

export {getAllLanguages};