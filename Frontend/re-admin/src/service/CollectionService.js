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

export {getAllCollections, deleteCollection, addCollection};