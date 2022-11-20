export const BASE_URL = 'https://amelin.mesto.backend.nomoredomains.icu/';

function request({ url, method = 'POST', data }) {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

export const register = (password, email) => {
  return request({
    url: 'signup',
    data: { password, email },
  });
};

export const login = (password, email) => {
  return request({
    url: 'signin',
    data: { password, email },
  });
};

export const logout = () => {
  return request({
    url: 'users/signout',
    method: 'DELETE',
  });
}

export const checkToken = () => {
  return request({
    url: 'users/me',
    method: 'GET',
  });
};
