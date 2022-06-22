import http from './base-api-service';

const upvoteProduct = async (alias: string) => http.post(`/product/${alias}/upvote`);
const downvoteProduct = async (alias: string) => http.delete(`/product/${alias}/upvote`);

export const upvotesService = {
  upvoteProduct,
  downvoteProduct
};
