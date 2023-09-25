import axios from "axios";

const COLLECTION_URL_API = "http://localhost:8081/api/v1/book-collection"

const getCollections = () => {
    return axios.get(COLLECTION_URL_API)
}

export {getCollections}