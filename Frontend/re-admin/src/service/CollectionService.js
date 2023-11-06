import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/book-collection";

const getAllCollections = () => {
    return axios.get(API_URL);
};

const deleteCollection = (collectionId) => {
    return axios.delete(API_URL + '/' + collectionId);
}

const addCollection = (collection) => {
    try{
        collection.isDisplay = Boolean(collection.isDisplay === 'true');
        return axios.post(API_URL, collection);
    }
    catch(err){
        console.log(err);
    }
}

const getCollectionsById = (id) => {
    return axios.get(API_URL + '/' + id);
}

const updateCollection = (data) => {
    return axios.put(API_URL , data);
}

export {getAllCollections, deleteCollection, addCollection, getCollectionsById, updateCollection};