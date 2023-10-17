import axios from "axios"

const BOOK_API_BASE_URL = "http://localhost:8081/api/v1/book"

const getBook = () => {
    return axios.get(BOOK_API_BASE_URL)
}

const getBookById = (id) => {
    return axios.get(BOOK_API_BASE_URL + '/' + id)
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

const getBooksByQuery = (id, page, min, max) => {
    if(id === 'all')
    {
        return axios.get(BOOK_API_BASE_URL + `/sorted-and-paged/by-collection?sortBy=price&page=${page === null ? 0 : page - 1}&size=12&sortOrder=asc${min ? `&min=${min}` : ''}${max ? `&max=${max}` : ''}`)
    }
    return axios.get(BOOK_API_BASE_URL + `/sorted-and-paged/by-collection?collection=${id}&sortBy=price&page=${page -1}&size=12&sortOrder=asc${min ? `&min=${min}` : ''}${max ? `&max=${max}` : ''}`)
}

const getBooksBySearchValue = (value) => {
    return axios.get(BOOK_API_BASE_URL + `/search?size=12&sortOrder=asc&name=${value}`)
}

export {getBook, getBookByQuery, getBooksByCollectionId, getBooksByQuery, getBookById, getBooksBySearchValue}