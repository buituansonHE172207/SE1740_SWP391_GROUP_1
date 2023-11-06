import axios from 'axios'

const BOOK_BASE_URL = "http://localhost:8081/api/v1/book";

const getAllBooks = () => {
    return axios.get(BOOK_BASE_URL + '/get-all');
}

const getBookById = (bookId) => {
    return axios.get(BOOK_BASE_URL + '/' + bookId);
}

const updateBook = (data) => {
    return axios.put(BOOK_BASE_URL, data);
}

const addBook = (data) => {
    return axios.post(BOOK_BASE_URL, data);
}

const deleteBook = (bookId) => {
    return axios.delete(BOOK_BASE_URL + '/' + bookId);
}

export {getAllBooks, getBookById, updateBook, addBook, deleteBook}