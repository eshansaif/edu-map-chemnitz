import { useState, useEffect } from "react";

const useAuthToken = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    token,
    setToken,
    logout,
  };
};

export default useAuthToken;
