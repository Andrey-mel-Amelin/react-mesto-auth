class Api {
  constructor(baseUrl, headers, corsHeaders) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._corsHeaders = corsHeaders;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _getFetch(pathUrl) {
    return fetch(`${this._baseUrl}${pathUrl}`, {
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseData(res));
  }

  _patchFetch(pathUrl, bodyConstructor) {
    return fetch(`${this._baseUrl}${pathUrl}`, {
      method: 'PATCH',
      headers: this._headers,
      body: bodyConstructor,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseData(res));
  }

  _postFetch(pathUrl, bodyConstructor) {
    return fetch(`${this._baseUrl}${pathUrl}`, {
      method: 'POST',
      headers: this._headers,
      body: bodyConstructor,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseData(res));
  }

  _deleteFetch(pathUrl) {
    return fetch(`${this._baseUrl}${pathUrl}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseData(res));
  }

  _putFetch(pathUrl) {
    return fetch(`${this._baseUrl}${pathUrl}`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo() {
    return this._getFetch('/users/me');
  }

  getCards() {
    return this._getFetch('/cards');
  }

  editProfile(data) {
    return this._patchFetch(
      '/users/me',
      JSON.stringify({
        name: data.name,
        about: data.about,
      })
    );
  }

  editProfileAvatar(data) {
    return this._patchFetch(
      `/users/me/avatar`,
      JSON.stringify({
        avatar: data,
      })
    );
  }

  addCard(data) {
    return this._postFetch(
      '/cards',
      JSON.stringify({
        name: data.name,
        link: data.link,
      })
    );
  }

  deleteCard(id) {
    return this._deleteFetch(`/cards/${id}`);
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this._putFetch(`/cards/${id}/likes`) : this._deleteFetch(`/cards/${id}/likes`);
  }
}

export const api = new Api('https://amelin.mesto.backend.nomoredomains.icu', {
  'Content-Type': 'application/json',
});
