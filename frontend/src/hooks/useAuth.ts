import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/store';
import { setIsLoggedIn } from 'reducer/isLoggedInSlice';
import axiosInstance from 'api/axiosInstance';

export interface LoginCredentials {
  userName: string;
  userPassword: string;
}

interface UseAuthReturn {
  isLoggedIn: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for managing authentication state with persistence
 */
export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.isLoggedIn.isLoggedIn
  );

  const login = useCallback(
    async ({ userName, userPassword }: LoginCredentials): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        await axiosInstance.post(
          '/api/v1/auth/login',
          {
            userName,
            userPassword
          },
          { withCredentials: true }
        );

        dispatch(setIsLoggedIn(true));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Login failed';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await axiosInstance.post(
        '/api/v1/auth/logout',
        {},
        { withCredentials: true }
      );
      // Clear sessionStorage and localStorage
      sessionStorage.clear();
    } catch (err) {
      console.error('Logout failed:', err);
    }
    dispatch(setIsLoggedIn(false));
  }, [dispatch]);

  return {
    isLoggedIn,
    login,
    logout,
    loading,
    error
  };
};
