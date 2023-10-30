import axios from "axios";

const PUBLISHER_BASE_URL = "https://backend.sachtructuyen.shop/api/v1/publisher";

const getAllPublishers = () => {
    return axios.get(PUBLISHER_BASE_URL);
}

const deletePublisher = (publisherId) => {
    return axios.delete(PUBLISHER_BASE_URL + '/' + publisherId);
}

const addPublisher = (publisher) => {
    axios.post(PUBLISHER_BASE_URL, publisher);
}

export {getAllPublishers, deletePublisher, addPublisher}