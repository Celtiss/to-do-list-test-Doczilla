export class Search {
    constructor ({initialTasks, renderFoundTasks}, searchForm) {
        this._initialTasks = initialTasks;
        this._renderFoundTasks= renderFoundTasks;
        this._form = searchForm;
        this._input = this._form.querySelector('.search__input');
        this._foundTasks = [];
    }

    _getInputValues () {
        const inputValue = this._input.value;
        return inputValue;
    }

    _findTasks() {
        const searchText = this._getInputValues().toLowerCase();
        // Используем метод filter для поиска задач по названию
        this._foundTasks = this._initialTasks.filter(task => {
            const taskName = task.name.toLowerCase();
            return taskName.includes(searchText);
        });
        this._renderFoundTasks(this._foundTasks);
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._findTasks();
        })
    }
}