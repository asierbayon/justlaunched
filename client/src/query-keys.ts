enum QueryKeyEntityType {
  PRODUCT = 'PRODUCT',
  USER = 'USER',
}

type QueryKeyReturnType = 'PAGINATED_LIST' | 'INFINITE_LIST' | 'LIST' | 'ITEM';

function generateQueryKey<T extends readonly unknown[]>(entityType: string, resultType: QueryKeyReturnType, ...params: T) {
  return [entityType, resultType, ...params] as const;
}

export const queryKeys = {
  user: (address: string) => generateQueryKey(QueryKeyEntityType.USER, 'ITEM', address),
  userProducts: (address: string) => generateQueryKey(QueryKeyEntityType.USER, 'PAGINATED_LIST', address),
  product: (alias: string) => generateQueryKey(QueryKeyEntityType.PRODUCT, 'ITEM', alias),
  feed: () => generateQueryKey(QueryKeyEntityType.PRODUCT, 'PAGINATED_LIST'),
} as const;