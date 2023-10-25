import axios from "axios";

const PUBLISHER_BASE_URL = "http://localhost:8081/api/v1/publisher";

const getAllPublishers = () => {
    return axios.get(PUBLISHER_BASE_URL);
}

export {getAllPublishers}