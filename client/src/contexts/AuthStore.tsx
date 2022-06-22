import { createContext, useState, useCallback, ReactNode, useMemo } from 'react';
// services
import type { IUser } from '../services/users-service';
import { currentUserStorageKey } from '../services/base-api-service';

interface AuthUser {
  currentUser: IUser;
  isAuthenticated: boolean;
  onUserChange: (currentUser: IUser | undefined) => void;
}

interface IAuthStoreProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthUser | undefined>(undefined);

function AuthStore({ children }: IAuthStoreProps) {
  const user = localStorage.getItem(currentUserStorageKey);
  const [currentUser, setUser] = useState(user ? JSON.parse(user) : undefined);

  const handleUserChange = useCallback((currentUser) => {
    if (currentUser) {
      localStorage.setItem(currentUserStorageKey, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(currentUserStorageKey);
    }
    setUser(currentUser);
  }, []);

  const isAuthenticated = useMemo(() => Boolean(currentUser && currentUser.address), [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, onUserChange: handleUserChange }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthStore as default, AuthContext };
