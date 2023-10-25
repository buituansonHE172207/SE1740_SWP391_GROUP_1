import axios from "axios";

const WISHLIST_BASE_URL = 'http://localhost:8081/api/v1/wishlist'

const getWishlistByUserId = (userId) => {
    return axios.get(WISHLIST_BASE_URL + '/by-user/' + userId);
}

const addWishList = (user, book) => {
    return axios.post(WISHLIST_BASE_URL + `?user=${user}&book=${book}`);
}

const deleteWishList = (user, book) => {
    return axios.delete(WISHLIST_BASE_URL + `?user=${user}&book=${book}`);
}


export {getWishlistByUserId, addWishList, deleteWishList}