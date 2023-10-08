import axios from "axios"

const SLIDER_API_BASE_URL = "localhost:8081/api/v1/slider"

const getSlider = () => {
    return axios.get(SLIDER_API_BASE_URL)
}

export {getSlider}