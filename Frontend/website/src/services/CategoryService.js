import axios from "axios";

const CATEGORIES_API_URL = 'http://localhost:8081/api/v1/book-category'
const getCategories = () => {
    return axios.get(CATEGORIES_API_URL)
}

export {getCategories}