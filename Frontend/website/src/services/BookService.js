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
        return axios.get(BOOK_API_BASE_URL + '/sorted-and-paged')
    }
    return axios.get(BOOK_API_BASE_URL + '/sorted-and-paged/by-collection?collection=' + id )
}

const getBooksByCollectionIdAndPage = (id, page) => {
    if(id === 'all')
    {
        return axios.get(BOOK_API_BASE_URL + `/sorted-and-paged?sortBy=id&page=${page === null ? 0 : page - 1}&size=12&sortOrder=asc`)
    }
    return axios.get(BOOK_API_BASE_URL + `/sorted-and-paged/by-collection?collection=${id}&sortBy=authors&page=${page -1}&size=12&sortOrder=desc`)
}

export {getBook, getBookByQuery, getBooksByCollectionId, getBooksByCollectionIdAndPage}