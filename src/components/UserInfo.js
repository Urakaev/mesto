export default class UserInfo{
  constructor(data){
    this._nameSelector = data.nameSelector
    this._footerNameSelector = data.footerNameSelector
    this._profSelector = data.profSelector
    this._avatarSelector = data.avatarSelector
    this._userNameElement = document.querySelector(this._nameSelector)
    this._userProfElement = document.querySelector(this._profSelector)
    this._userAvatarElement = document.querySelector(this._avatarSelector)
    this._userFooterNameElement = document.querySelector(this._footerNameSelector)
  }
  getUserInfo() {
    this._userCurrentValue = this._userNameElement.textContent;
    this._userProfCurrentValue = this._userProfElement.textContent;
    this._formProfileValues = {};
    this._formProfileValues.name = this._userCurrentValue;
    this._formProfileValues.about = this._userProfCurrentValue;

    return this._formProfileValues;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name
    this._userProfElement.textContent = data.about
    this._userFooterNameElement.textContent = data.name
  }

  setUserAvatar(avatarUrl, avatarAlt) {
    this._userAvatarElement.src = avatarUrl;
    this._userAvatarElement.alt =  avatarAlt
  }
}
