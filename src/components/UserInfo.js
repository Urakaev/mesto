export default class UserInfo{
  constructor(data){
    this._nameSelector = data.nameSelector
    this._profSelector = data.profSelector
    this._userNameElement = document.querySelector(this._nameSelector)
    this._userProfElement = document.querySelector(this._profSelector)
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
  }
}
