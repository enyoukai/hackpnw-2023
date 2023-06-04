import axios from 'axios'
import { useState, useEffect } from 'react';

export const useSession = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios('/checkToken');
        console.log(response.status_code);
        if (response.status_code === 200) {
          const user = await response.json();
          setUser(user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchSession();
  }, []);

  // const login = async (email, password) => {
  //   try {
  //     const response = await fetch('/api/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password })
  //     });
  //     if (response.ok) {
  //       const user = await response.json();
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     setUser(null);
  //   }
  // };

  // const logout = async () => {
  //   try {
  //     await fetch('/api/logout');
  //     setUser(null);
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // };

  return { user, isAuthenticated};
};