import axios from "axios";
import React from 'react'

const PROVINCE_API_BASE_URL = "https://provinces.open-api.vn/api/";

const getProvince = () => {
    return axios.get(PROVINCE_API_BASE_URL + "p/");
}
const getDistrict = (id) => {
    if(id === null || id === undefined)
        return;
    return axios.get(PROVINCE_API_BASE_URL + `p/${id}/?depth=2`);
}

const getWard = (id) => {
    if(id === null || id === undefined)
        return;
    return axios.get(PROVINCE_API_BASE_URL + `d/${id}/?depth=2`);
}

const getDistrictById = (id) => {
    if(id === null || id === undefined)
        return
    return axios.get(PROVINCE_API_BASE_URL + `d/${id}`)
    .then(response => {
        return response.data.name;
    })
}

const getWardById = (id) => {
    if(id === null || id === undefined)
        return
    return axios.get(PROVINCE_API_BASE_URL + `w/${id}`)
    .then(response => {
        return response.data.name;
    })
}

const getProvinceById = (id) => {
    if(id === null || id === undefined)
        return
    return axios.get(PROVINCE_API_BASE_URL + `p/${id}`)
    .then(response => {
        return response.data.name;
    })
}

export {getProvince, getDistrict, getWard, getDistrictById, getWardById, getProvinceById}