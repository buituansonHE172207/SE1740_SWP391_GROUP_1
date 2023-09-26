import axios from "axios"

const BOOK_API_BASE_URL = "http://localhost:8081/api/v1/book"

const getBook = () => {
    return axios.get(BOOK_API_BASE_URL)
}

const getBookByQuery = (query) => {
    return axios.get(BOOK_API_BASE_URL + '/' + query)
}

const getBooksByCollectionId = (id) => {
    if(id === 'all')
    {
        return getBook()
    }
    return axios.get(BOOK_API_BASE_URL + '/sorted-and-paged/by-collection?collection=' + id )
}

export {getBook, getBookByQuery, getBooksByCollectionId}