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