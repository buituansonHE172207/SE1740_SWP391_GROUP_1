import axios from "axios";

const ORDER_BASE_URL = "http://localhost:8081/api/v1/order";

const getAllOrders = () => {
    return axios.get(ORDER_BASE_URL + "/get-all");
};

export { getAllOrders };