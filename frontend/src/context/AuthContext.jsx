import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ims_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('ims_user', JSON.stringify(user));
    else localStorage.removeItem('ims_user');
  }, [user]);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser({ ...data.user, token: data.token });
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    setUser({ ...data.user, token: data.token });
  };

  const logout = () => setUser(null);

  const updateProfileImage = (profileImage) => {
    setUser((prev) => ({ ...prev, profileImage }));
    // Update local storage explicitly if needed, but the useEffect handles it.
  };

  const removeProfileImage = () => {
    setUser((prev) => ({ ...prev, profileImage: '' }));
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const value = { user, login, register, logout, updateProfileImage, removeProfileImage, updateUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

