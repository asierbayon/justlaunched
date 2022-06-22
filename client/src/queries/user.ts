import { queryKeys } from '../query-keys';
import { usersService } from '../services/users-service';
import { useQuery } from 'react-query';

const fetchUserQueryFn = (address: string) => usersService.fetchUser(address);

export const useUser = (address: string) => useQuery(queryKeys.user(address), () => fetchUserQueryFn(address));
