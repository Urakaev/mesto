export default class Section {
    constructor({ data, renderer }, containerSelector) { // передаём массив, функцию инструкцию из index.js и название селектора куда вставляем что то(строка)
      this._renderedItems = data;
      this._renderer = renderer;

      this._container = document.querySelector(containerSelector); //получаем дом элемент куда будем вставлять
    }

    renderItems() {  // функция которая проходит по массиву и выполняет инструкцию которую мы получили параметром в конструкторе
      this._renderedItems.forEach(item => this._renderer(item))
    }
    renderItem() {
      this._renderer(this._renderedItems)
    }
    addItems(element) { // функция которая вставляет в контейнер готовый элемент, вызывается в инструкции
      this._container.append(element);
    }
    addItem(element) {
      this._container.prepend(element);
    }
  }
