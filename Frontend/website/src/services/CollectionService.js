import axios from "axios";

const COLLECTION_URL_API = "http://74.235.148.227:8081/api/v1/book-collection"

const getCollections = () => {
    return axios.get(COLLECTION_URL_API)
}

const getCollectionById = (id) => { 
    return axios.get(COLLECTION_URL_API + '/' + id)
}

export {getCollections, getCollectionById}