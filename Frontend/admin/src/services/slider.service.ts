import axiosInstance from "../http";

export interface ISlider {
	id: number;
	title: string;
	imageUrl: string;
	backLink: string;
	description: string;
}

const SLIDER_URI = "slider";

export const getAllSlider = async () => {
    const response = await axiosInstance.get<ISlider[]>(SLIDER_URI);
    return response.data;
};

export const addSlider = async (params: ISlider) => {
    const response = await axiosInstance.post(SLIDER_URI, params);
    return response.data;
};

export const updateSlider = async (params: ISlider) => {
    const response = await axiosInstance.put(SLIDER_URI, params);
    return response.data;
};

export const deleteSlider = async (id: string) => {
    const response = await axiosInstance.delete(`${SLIDER_URI}/${id}`);
    return response.data;
};