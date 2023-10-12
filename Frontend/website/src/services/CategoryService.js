import axios from "axios";

const CATEGORIES_API_URL = 'https://backend.sachtructuyen.shop/api/v1/book-category'
const getCategories = () => {
    return axios.get(CATEGORIES_API_URL)
}

export {getCategories}