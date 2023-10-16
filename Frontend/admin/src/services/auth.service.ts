import axiosInstance from "../http";

export interface IAuth {
    // id: number;
    // title: string;
    // imageUrl: string;
    // backLink: string;
    // description: string;
    token: string;
}

type Authority = {
    authority: string;
};

export type TokenType = {
    authorities: Authority[];
    sub: string;
    iat: number;
    exp: number;
};

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister extends ILogin {
    fullName: string;
}

const AUTH = "auth";

export const login = async (params: ILogin) => {
    const response = await axiosInstance.post<IAuth>(`${AUTH}/authenticate`, params);
    return response.data;
};

export const register = async (params: IRegister) => {
    const response = await axiosInstance.post<IAuth>(`${AUTH}/register`, params);
    return response.data;
};
