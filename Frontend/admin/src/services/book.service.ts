import axiosInstance from "../http";

export interface IBookCategory {
    id: number;
    name: string;
}

const BOOK_CATEGORY_URI = "book-category";

export const getAllBookCategory = async () => {
    const response = await axiosInstance.get<IBookCategory[]>(BOOK_CATEGORY_URI);
    return response.data;
};

export const addBookCategory = async (params: any) => {
    const response = await axiosInstance.post(BOOK_CATEGORY_URI, params);
    return response.data;
};

export const updateBookCategory = async (params: any) => {
    const response = await axiosInstance.put(BOOK_CATEGORY_URI, params);
    return response.data;
};

export const deleteBookCategory = async (id: string) => {
    const response = await axiosInstance.delete(`${BOOK_CATEGORY_URI}/${id}`);
    return response.data;
};