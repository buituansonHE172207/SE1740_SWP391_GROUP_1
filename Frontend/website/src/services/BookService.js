import axios from "axios"

const SLIDER_API_BASE_URL = "http://localhost:8081/api/v1/book"

const getBook = () => {
    return axios.get(SLIDER_API_BASE_URL)
}

const getBookByQuery = (query) => {
    return axios.get(SLIDER_API_BASE_URL + '/' + query)
}

const getTop5NewBook = () => {
    return axios.get(SLIDER_API_BASE_URL + '/sorted-and-paged?sortBy=sold&page=1&size=5')
}

export {getBook, getBookByQuery, getTop5NewBook}