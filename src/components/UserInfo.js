export default class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
    console.log(this._name, this._about);
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
}
