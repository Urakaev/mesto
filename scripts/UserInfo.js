export default class UserInfo{
  constructor(data){
    this._nameSelector = data.nameSelector
    this._profSelector = data.profSelector
  }
  getUserInfo() {
    this._userCurrentValue = document.querySelector(this._nameSelector).textContent;
    this._userProfCurrentValue = document.querySelector(this._profSelector).textContent;
    this._formProfileValues = {};
    this._formProfileValues.name = this._userCurrentValue;
    this._formProfileValues.about = this._userProfCurrentValue;

    return this._formProfileValues;
  }
  setUserInfo(data) {
     document.querySelector(this._nameSelector).textContent = data.name
     document.querySelector(this._profSelector).textContent = data.about
  }
}
