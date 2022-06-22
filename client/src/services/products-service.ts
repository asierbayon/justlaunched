import http from './base-api-service';

export interface IUserFromProduct {
  address: string;
  avatar: string;
}
export interface IProduct {
  name: string;
  alias: string;
  tagline: string;
  description: string;
  logo: string;
  coverImage: string;
  website: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  upvotes: number;
  upvoted: boolean;
  user: IUserFromProduct;
}

export interface IUpdateProductProfile {
  name?: string;
  alias?: string;
  tagline?: string;
  description?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
}

export interface ICreateProduct {
  name: string;
  alias: string;
  tagline: string;
  description: string;
  logo?: string;
  website: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
}

export interface IUpdateProductLogo {
  logo: string;
}

export interface IUpdateProductCoverImage {
  coverImage: string;
}

export interface IProductFeedRequest {
  products: IProduct[];
  pages: number;
}


export const fetchProductsOfDate = async (date: string, daysAgo?: string) => {
  const data = await http.get(`/products?date=${date}&daysAgo=${daysAgo ?? 0}`) as unknown as IProduct[];

  return data;
};
export const fetchFeed = async (skip: number) => {
  const data = await http.get(`/feed?skip=${skip}`) as unknown as IProductFeedRequest;

  return data;
};
const createProduct = async (product: ICreateProduct) => {
  const data = await http.post('/product/', product) as unknown as IProduct;

  return data;
};
const fetchProduct = async (alias: string) => {
  const data = await http.get(`/product/${alias}`) as unknown as IProduct;

  return data;
};
export const updateProduct = async (alias: string, product: IUpdateProductProfile) => {
  const data = await http.put(`/product/${alias}/update`, product) as unknown as IProduct;

  return data;
}
export const updateProductLogo = async (alias: string, product: IUpdateProductLogo) => {
  const data = await http.put(`/product/${alias}/update-logo`, product) as unknown as IProduct;

  return data;
}
export const updateProductCoverImage = async (alias: string, product: IUpdateProductCoverImage) => {
  const data = await http.put(`/product/${alias}/update-cover-image`, product) as unknown as IProduct;

  return data;
}
export const deleteProduct = (alias: string) => http.delete(`/product/${alias}`);

export const productsService = {
  fetchFeed,
  createProduct,
  fetchProduct,
  updateProduct,
  updateProductLogo,
  updateProductCoverImage,
  deleteProduct,
};
