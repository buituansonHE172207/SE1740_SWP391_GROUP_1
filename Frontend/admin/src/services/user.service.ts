import axiosInstance from "../http";

export interface IUser {
	id: number;
	fullName: string;
	province: string;
	district: string;
	ward: string;
	address: string;
	phone: string;
	email: string;
	role: string;
	state: string;
	enabled: boolean;
	accountNonExpired: boolean;
	accountNonLocked: boolean;
	credentialsNonExpired: boolean;
	username: string;
}

const USER = "user";

export const getUserByEmail = async (email: string) => {
    const response = await axiosInstance.get<IUser>(`${USER}/by-email/${email}`);
    return response.data;
};