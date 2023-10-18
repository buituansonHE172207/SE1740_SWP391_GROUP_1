import axiosInstance from "../http";
import { WebResponse } from "./base.response";
import { IUser } from "./user.service";

export interface IPostCategory {
    id: number;
    name: string;
}

export interface IPost {
    id: number;
    title: string;
    category: IPostCategory;
    user: IUser;
    thumbnail: string;
    content: string;
    brief: string;
    createdAt: string;
    state: any;
}

const POST = "post";
const POST_CATEGORY = "post-category";

export const getAllPostCategory = async () => {
    const response = await axiosInstance.get<IPostCategory[]>(POST_CATEGORY);
    return response.data;
};

export const addPostCategory = async (params: any) => {
    const response = await axiosInstance.post(POST_CATEGORY, params);
    return response.data;
};

export const updatePostCategory = async (params: any) => {
    const response = await axiosInstance.put(POST_CATEGORY, params);
    return response.data;
};

export const deletePostCategory = async (id: string) => {
    const response = await axiosInstance.delete(`${POST_CATEGORY}/${id}`);
    return response.data;
};
export const getAllPost = async () => {
    const response = await axiosInstance.get<WebResponse<IPost>>(POST);
    return response.data;
};

export const addPost = async (params: any) => {
    const response = await axiosInstance.post(POST, params);
    return response.data;
};

export const updatePost = async (params: any) => {
    const response = await axiosInstance.put(POST, params);
    return response.data;
};

export const deletePost = async (id: string) => {
    const response = await axiosInstance.delete(`${POST}/${id}`);
    return response.data;
};


