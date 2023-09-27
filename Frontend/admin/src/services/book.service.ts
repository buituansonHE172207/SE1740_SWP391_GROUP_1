import axiosInstance from "../http";

export interface IBookCategory {
    id: number;
    name: string;
}

export const getAllBookCategory = async () => {
    const response = await axiosInstance.get<IBookCategory[]>('book-category');
    return response.data;
};

export const addBookCategory = async (params: any) => {
    const response = await axiosInstance.post('book-category', params);
    return response.data;
};

export const updateBookCategory = async (params: any) => {
    const response = await axiosInstance.put('book-category', params);
    return response.data;
};

export const deleteBookCategory = async (id: string) => {
    const response = await axiosInstance.delete(`book-category/${id}`);
    return response.data;
};