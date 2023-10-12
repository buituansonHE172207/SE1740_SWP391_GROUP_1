import axios from "axios";

const COLLECTION_URL_API = "https://backend.sachtructuyen.shop/api/v1/book-collection"

const getCollections = () => {
    return axios.get(COLLECTION_URL_API)
}

const getCollectionById = (id) => { 
    return axios.get(COLLECTION_URL_API + '/' + id)
}

export {getCollections, getCollectionById}