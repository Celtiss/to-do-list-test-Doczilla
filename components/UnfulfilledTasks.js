export class UnfullfilledTasks {
    constructor ({initialTasks, renderFilteredTasks}, filterCountainer) {
        this._initialTasks = initialTasks;
        this._renderFilteredTasks = renderFilteredTasks;
        this._filterElement = filterCountainer.querySelector('.filter__checkbox');
        this._filteredTasks = [];
    }

    // Отфильтровать по невыполненным задачам
    _filterTasks() {
        const checkboxStatus = this._filterElement.checked; // статус текущего чекбокса 
        this._filteredTasks = this._initialTasks.filter(task => { 
            return checkboxStatus ? task.status === false : task;
        });
        this._renderFilteredTasks(this._filteredTasks);
    }

    setEventListeners() {
        this._filterElement.addEventListener('click', (evt) => {
            this._filterTasks();
        })
    }
}