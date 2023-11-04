import axios from "axios";

const ACCOUNT_BASE_URL = "http://localhost:8081/api/v1/auth/";

const createAccount = (account) => {
    return axios.post(ACCOUNT_BASE_URL + 'register', account);
}

const login = (account) => {
    return axios.post(ACCOUNT_BASE_URL + 'authenticate', account);
}

const getUserInfoByEmail = (email) => {
    return axios.get(`http://localhost:8081/api/v1/user/by-email/${email}`);
}

const updateUser = (profile) => {
    return axios.put("http://localhost:8081/api/v1/user", profile);
}

const forgetPassword = (email) => {
    return axios.post(ACCOUNT_BASE_URL + 'forgot-password', email);
}

const resetPassword = (resetData) => {
    return axios.post(ACCOUNT_BASE_URL + 'reset-password', resetData);
}

const activateAccount = (token) => {
    return axios.post("http://localhost:8081/api/v1/auth/activation", token)
}

const changePassword = (data) => {
    return axios.post("http://localhost:8081/api/v1/auth/change-password", data)

}

export {createAccount, login, getUserInfoByEmail, updateUser, forgetPassword, resetPassword, activateAccount, changePassword}