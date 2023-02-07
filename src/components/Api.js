export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  //проверка на выполнение
  _result(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  //получаем данные пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    }).then((res) => this._result(res));
  }

  //получаем все карочки с сервера
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    }).then((res) => this._result(res));
  }

  //меняем имя пользователя
  changeUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    }).then((res) => this._result(res));
  }

  //меняем аватарку
  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    }).then((res) => this._result(res));
  }

  //отправляем новую карточку на сервер
  //данные берем из попапа добавления новой карточки
  createNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,      
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    }).then((res) => this._result(res));
  }

  //удаление карточки
  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers      
    }).then((res) => this._result(res));
  }

  //добавление лайка карточке
  addLike(idCard) {
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      method: "PUT",
      headers: this._headers      
    }).then((res) => this._result(res));
  }

  // слимаем лайк карточке
  removeLike(idCard) {
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      method: "DELETE",
      headers: this._headers      
    }).then((res) => this._result(res));
  }
}
