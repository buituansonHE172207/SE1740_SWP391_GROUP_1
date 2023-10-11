import axios from "axios";

const CATEGORIES_API_URL = 'http://74.235.148.227:8081/api/v1/book-category'
const getCategories = () => {
    return axios.get(CATEGORIES_API_URL)
}

export {getCategories}