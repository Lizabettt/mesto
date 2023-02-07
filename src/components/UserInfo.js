export default class UserInfo {
  constructor(name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }
  getUserInfo() {
    const infoUser = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return infoUser;
  }
  setUserInfo(data) {
    this._name.textContent = data.name; // в поле пользователя вписываем новое значение
    this._about.textContent = data.about;
  }
  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
