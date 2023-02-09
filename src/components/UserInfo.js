export default class UserInfo {
  constructor({nameProfile, jobProfile, avatarProfile}) {
    this._name = document.querySelector(nameProfile);
    this._about = document.querySelector(jobProfile);
    this._avatar = document.querySelector(avatarProfile);
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
