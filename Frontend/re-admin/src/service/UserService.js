import axios from "axios";

const ACCOUNT_BASE_URL = "https://backend.sachtructuyen.shop/api/v1/auth/";

const login = (account) => {
    return axios.post(ACCOUNT_BASE_URL + 'authenticate', account);
}

export {login}