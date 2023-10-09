import axiosInstance from "../http";

export interface IAuth {
	// id: number;
	// title: string;
	// imageUrl: string;
	// backLink: string;
	// description: string;
    token: string;
}

export interface ILogin {
    email: string;
    password: string;
}

const AUTH = "auth";

export const login = async (params: ILogin) => {
    const response = await axiosInstance.post<IAuth>(`${AUTH}/authenticate`, params);
    return response.data;
};

// export const addAuth = async (params: IAuth) => {
//     const response = await axiosInstance.post(AUTH, params);
//     return response.data;
// };

// export const updateAuth = async (params: IAuth) => {
//     const response = await axiosInstance.put(AUTH, params);
//     return response.data;
// };

// export const deleteAuth = async (id: string) => {
//     const response = await axiosInstance.delete(`${AUTH}/${id}`);
//     return response.data;
// };