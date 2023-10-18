import axiosInstance from "../http";

export interface IPublisher {
    id: number;
    name: string;
    website?: string;
}

const PUBLISHER = "publisher";

export const getAllPublisher = async () => {
    const response = await axiosInstance.get<IPublisher[]>(PUBLISHER);
    return response.data;
};

export const addPublisher = async (params: any) => {
    const response = await axiosInstance.post(PUBLISHER, params);
    return response.data;
};

export const updatePublisher = async (params: any) => {
    const response = await axiosInstance.put(PUBLISHER, params);
    return response.data;
};

export const deletePublisher = async (id: string) => {
    const response = await axiosInstance.delete(`${PUBLISHER}/${id}`);
    return response.data;
};