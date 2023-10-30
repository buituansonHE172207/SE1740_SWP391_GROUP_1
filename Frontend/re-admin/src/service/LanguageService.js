import axios from "axios";

const API_URL = "https://backend.sachtructuyen.shop/api/v1/language";

const getAllLanguages = () => {
    return axios.get(API_URL);
}

export {getAllLanguages};