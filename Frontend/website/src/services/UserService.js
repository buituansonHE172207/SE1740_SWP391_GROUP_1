import axios from "axios";

const ACCOUNT_BASE_URL = "http://74.235.148.227:8081/api/v1/auth/";

const createAccount = (account) => {
    return axios.post(ACCOUNT_BASE_URL + 'register', account);
}

const login = (account) => {
    return axios.post(ACCOUNT_BASE_URL + 'authenticate', account);
}

const getUserInfoByEmail = (email) => {
    return axios.get(`http://74.235.148.227:8081/api/v1/user/by-email/${email}`);
}

const updateUser = (profile) => {
    return axios.put("http://74.235.148.227:8081/api/v1/user", profile);
}

const forgetPassword = (email) => {
    return axios.post(ACCOUNT_BASE_URL + 'forgot-password', email);
}

const resetPassword = (resetData) => {
    return axios.post(ACCOUNT_BASE_URL + 'reset-password', resetData);
}

export {createAccount, login, getUserInfoByEmail, updateUser, forgetPassword, resetPassword}