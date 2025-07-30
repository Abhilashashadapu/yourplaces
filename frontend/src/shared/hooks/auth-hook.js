import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expiryDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpiryDate = expiryDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token: token,
      expiryDate: tokenExpiryDate.toISOString()
    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  // Auto-login on app start
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiryDate) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiryDate));
    } else if (storedData) {
      localStorage.removeItem('userData');
    }
  }, [login]);

  // Auto-logout when token expires
  useEffect(() => {
    let logoutTimer;
    if (token) {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (storedData && storedData.expiryDate) {
        const expiryTime = new Date(storedData.expiryDate).getTime();
        const currentTime = new Date().getTime();
        const timeUntilExpiry = expiryTime - currentTime;
        
        if (timeUntilExpiry > 0) {
          logoutTimer = setTimeout(() => {
            logout();
          }, timeUntilExpiry);
        } else {
          logout();
        }
      }
    }
    
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [token, logout]);

  return { token, login, logout, userId };
};
