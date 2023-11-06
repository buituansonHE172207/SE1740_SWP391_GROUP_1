import axios from "axios";

const PUBLISHER_BASE_URL = "http://localhost:8081/api/v1/publisher";

const getAllPublishers = () => {
    return axios.get(PUBLISHER_BASE_URL);
}

const deletePublisher = (publisherId) => {
    return axios.delete(PUBLISHER_BASE_URL + '/' + publisherId);
}

const addPublisher = (publisher) => {
    axios.post(PUBLISHER_BASE_URL, publisher);
}

const getPublisherById = (id) => {
    return axios.get(PUBLISHER_BASE_URL + '/' + id);
}

const updatePublisher = (data) => {
    return axios.put(PUBLISHER_BASE_URL , data);
}

export {getAllPublishers, deletePublisher, addPublisher, getPublisherById, updatePublisher}