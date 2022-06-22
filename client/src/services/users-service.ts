import { IProduct } from 'src/services';
import http from './base-api-service';

interface UserLogin {
  address: string;
}

export interface IUser {
  address: string;
  email?: string;
  avatar: string;
  about?: string;
  coverImage: string;
  twitter?: string;
  discord?: string;
  website?: string;
}

export interface IUpdateUserProfile {
  website?: string;
  twitter?: string;
  about?: string;
}

export interface IUpdateUserAvatar {
  avatar: File;
}

export interface IUpdateUserCoverImage {
  coverImage: File;
}

export interface IFetchUserProductsRequest {
  pages: number;
  products: IProduct[];
}

export const login = async (user: UserLogin) => { 
  const data = await http.post('/login', user) as unknown as IUser; 

  return data;
}
export const logout = () => http.post('/logout');
export const fetchUser = async (address: string) => {
  const data = await http.get(`/user/${address}`) as unknown as IUser;

  return data;
}
export const updateUserProfile = async (address: string, user: IUpdateUserProfile) => {
  const data = await http.put(`/user/${address}/update-profile`, user) as unknown as IUser;

  return data;
}
export const updateUserAvatar = async (address: string, user: IUpdateUserAvatar) => {
  const data = await http.put(`/user/${address}/update-avatar`, user) as unknown as IUser;

  return data;
}
export const updateUserCoverImage= async (address: string, user: IUpdateUserCoverImage) => {
  const data = await http.put(`/user/${address}/update-cover-image`, user) as unknown as IUser;

  return data;
}
export const deleteUserAccount = (address: string) => http.delete(`/user/${address}/delete`);
export const fetchUserProducts= async (address: string, skip: number) => {
  const data = await http.get(`/user/${address}/products?skip=${skip}`) as unknown as IFetchUserProductsRequest;

  return data;
}

export const usersService = {
  logout,
  login,
  fetchUser,
  updateUserProfile,
  updateUserAvatar,
  updateUserCoverImage,
  deleteUserAccount,
  fetchUserProducts
};