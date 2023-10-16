import axiosInstance from "../http";

export interface IAuthor {
    id: number;
    name: string;
    comapny?: string;
}

const AUTHOR = "author";

export const getAllAuthor = async () => {
    const response = await axiosInstance.get<IAuthor[]>(AUTHOR);
    return response.data;
};

export const addAuthor = async (params: any) => {
    const response = await axiosInstance.post(AUTHOR, params);
    return response.data;
};

export const updateAuthor = async (params: any) => {
    const response = await axiosInstance.put(AUTHOR, params);
    return response.data;
};

export const deleteAuthor = async (id: string) => {
    const response = await axiosInstance.delete(`${AUTHOR}/${id}`);
    return response.data;
};