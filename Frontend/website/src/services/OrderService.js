import axios from "axios";

const ORDER_BASE_URL = 'http://localhost:8081/api/v1/order'

const getOrderByUserId = (userId) => {
    return axios.get(ORDER_BASE_URL + '/user/' + userId);
}

const addOrder = (order) => {
    return axios.post(ORDER_BASE_URL + '/process', order);
}

const cancelOrder = (orderId) => {
    return axios.put(ORDER_BASE_URL + '/cancel/' + orderId)
}

const getOrderById = (orderId) => {
    return axios.get(ORDER_BASE_URL + '/' + orderId)
}

export {getOrderByUserId, addOrder, cancelOrder, getOrderById}