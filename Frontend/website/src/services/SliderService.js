import axios from "axios"

const SLIDER_API_BASE_URL = "https://backend.sachtructuyen.shop/api/v1/slider"

const getSlider = () => {
    return axios.get(SLIDER_API_BASE_URL)
}

export {getSlider}