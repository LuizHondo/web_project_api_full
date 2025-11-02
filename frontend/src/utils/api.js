class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    };
  }

  // USER
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders()
    }).then(this._handleResponse);
  }

  // INITIAL CARDS
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders()
    }).then(this._handleResponse);
  }

  // UPDATE NAME AND ABOUT
  updateProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleResponse);
  }

  // UPDATE AVATAR
  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: avatarUrl })
    }).then(this._handleResponse);
  }

  // CARDS
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    }).then(this._handleResponse);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._getHeaders()
    }).then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001'
});

export default api;

