import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/slider";

const getAllSliders = () => {
    return axios.get(API_URL);
}

const deleteSlider = (sliderId) => {
    return axios.delete(API_URL + '/' + sliderId);
}

const addSlider = (slider) => {
    return axios.post(API_URL, slider);
}

const getSliderById = (id) => {
    return axios.get(API_URL + '/' + id);
}

const updateSlider = (data) => {
    return axios.put(API_URL , data);
}

export {getAllSliders, deleteSlider, addSlider, getSliderById, updateSlider};