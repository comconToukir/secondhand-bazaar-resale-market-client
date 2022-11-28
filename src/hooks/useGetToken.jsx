import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const useGetToken = (email, from) => {
  const [token, setToken] = useState(null);
  // const [isTokenLoading, setIsTokenLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);

            navigate(from);
          }
          // setIsTokenLoading(false);
        });
    }
  }, [email, from, navigate]);

  return [token];
};

export default useGetToken;
