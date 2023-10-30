import axios from "axios";

const ACCOUNT_BASE_URL = "https://backend.sachtructuyen.shop/api/v1/auth/";

const createAccount = (account) => {
    return axios.post(ACCOUNT_BASE_URL + 'register', account);
}

const login = (account) => {
    return axios.post(ACCOUNT_BASE_URL + 'authenticate', account);
}

const getUserInfoByEmail = (email) => {
    return axios.get(`https://backend.sachtructuyen.shop/api/v1/user/by-email/${email}`);
}

const updateUser = (profile) => {
    return axios.put("https://backend.sachtructuyen.shop/api/v1/user", profile);
}

const forgetPassword = (email) => {
    return axios.post(ACCOUNT_BASE_URL + 'forgot-password', email);
}

const resetPassword = (resetData) => {
    return axios.post(ACCOUNT_BASE_URL + 'reset-password', resetData);
}

const activateAccount = (token) => {
    return axios.post("https://backend.sachtructuyen.shop/api/v1/auth/activation", token)
}

export {createAccount, login, getUserInfoByEmail, updateUser, forgetPassword, resetPassword, activateAccount}