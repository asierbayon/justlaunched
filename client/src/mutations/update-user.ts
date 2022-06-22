import { useMutation } from 'react-query';
import { usersService, IUpdateUserProfile } from '../services/users-service';

export const updateUserProfileMutationFn = (address: string, user: IUpdateUserProfile) =>
  usersService.updateUserProfile(address, user);

export const useUserMutation = (address: string, user: IUpdateUserProfile) =>
  useMutation('test', () => updateUserProfileMutationFn(address, user));
