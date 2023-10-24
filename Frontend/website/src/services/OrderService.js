import axios from "axios";

const ORDER_BASE_URL = 'https://backend.sachtructuyen.shop/api/v1/order'

const getOrderByUserId = (userId) => {
    return axios.get(ORDER_BASE_URL + '/user/' + userId);
}

const addOrder = (order) => {
    return axios.post(ORDER_BASE_URL + '/process', order);
}

export {getOrderByUserId, addOrder}