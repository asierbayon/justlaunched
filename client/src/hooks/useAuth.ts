import { useContext } from 'react';
// contexts
import { AuthContext } from '../contexts/AuthStore';

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context must be use inside AuthStore');

  return context;
};

export default useAuth;