class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  /////// PEGA USER
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._handleResponse);
  }
  //////// PEGA INITIAL CARDS
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._handleResponse);
  }
  ///// ATUALIZA NOME E DESCRIÇÃO
  updateProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleResponse);
  }
  //// ATUALIZA AVATAR
  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarUrl })
    }).then(this._handleResponse);
  }
  //////////////////////////////////
  ///////////////////CARDS
  /////////////// ADICIONAR CARD
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleResponse);
  }
  //////// REMOVER CARD
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._handleResponse);
  }
  //////// CURTIR
  toggleLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers
    }).then(this._handleResponse);
  }


}

const api = new Api({
baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
headers: {
  authorization: "4fe3b6e2-c8d9-4e4d-8a1e-c00cea17e8fc",
  "Content-Type": "application/json"
      } 
  }
)

export default api;