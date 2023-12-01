class Task {
    constructor(data, templateSelector, handleTaskClick, getDate) {
        this._data = data;
        this._id = data._id;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate(); // элемент задачки
        this._handleTaskClick = handleTaskClick;
        this._getDate = getDate;
    }

    generateTask () {
        const template = this._createTask(); //создание карточки задачки
        return template;
    }


    // Получить селектор template элемента карточки задачи
    _getTemplate() {
        const taskElement = document.querySelector(this._templateSelector).content.querySelector('.task').cloneNode(true);
        return taskElement; 
    }

    // Создать карточку задачки
    _createTask () {
        const checkbox = this._element.querySelector('.checkbox');
        const label = this._element.querySelector('.task__label');
        //Заполняем карточку задачки данными
        this._element.querySelector('.task__title').textContent = this._data.name;
        this._element.querySelector('.task__desc').textContent = this._data.shortDesc;
        this._element.querySelector('.task__date').textContent = this._getDate(this._data.date);
        checkbox.setAttribute("id", this._data.id);
        label.setAttribute("for", this._data.id);
        this._data.status ? checkbox.checked = true : checkbox.checked = false;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners () {
        this._element.addEventListener('click', () => this._handleTaskClick(this._data));
    }
}

export { Task };