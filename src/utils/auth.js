export const BASE_URL = 'https://auth.nomoreparties.co/';

function request({ url, method = 'POST', data, token }) {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

export const authorize = (password, email) => {
  return request({
    url: 'signin',
    data: { password, email },
  });
};

export const register = (password, email) => {
  return request({
    url: 'signup',
    data: { password, email },
  });
};

export const checkToken = (token) => {
  return request({
    url: 'users/me',
    method: 'GET',
    token: token,
  });
};
