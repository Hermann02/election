import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = tokenString?JSON.parse(tokenString) : '';
    return userToken
  };

  const [token, setToken] = useState(getToken());
  console.log(getToken())
  const saveToken = userToken => {

    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

