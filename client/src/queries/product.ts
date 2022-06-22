import { queryKeys } from '../query-keys';
import { useQuery } from 'react-query';
import { productsService } from '../services';

const fetchProductQueryFn = (alias: string) => productsService.fetchProduct(alias);
const fetchFeedQueryFn = (skip: number) => productsService.fetchFeed(skip);

export const useProduct = (alias: string) => useQuery(queryKeys.product(alias), () => fetchProductQueryFn(alias));

export const useFeed = (skip: number) => useQuery(queryKeys.feed(), () => fetchFeedQueryFn(skip));
