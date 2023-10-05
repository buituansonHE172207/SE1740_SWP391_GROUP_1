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

export {createAccount, login, getUserInfoByEmail, updateUser}