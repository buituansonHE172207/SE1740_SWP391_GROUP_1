import axios from "axios";

const CART_API_BASE_URL = "http://localhost:8081/api/v1/cart";

const getAllCartByUserId = (id) => {
    return axios.get(CART_API_BASE_URL + '/by-user/' + id);
}

const addToCart = (cart) => {
    return axios.post(CART_API_BASE_URL + '/add', cart);
}

const updateCartItem = (cart) => {
    return axios.put(CART_API_BASE_URL, cart)
}

export {getAllCartByUserId, addToCart, updateCartItem}