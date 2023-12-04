export class FilterToday {
    constructor ({initialTasks, renderFilteredTasks}, filterContainer) {
        this._todayButton = filterContainer.querySelector('.filter__button_type_today');
        this._initialTasks = initialTasks;
        this._renderFilteredTasks = renderFilteredTasks;
        this._foundTasks = [];
    }

    _getDate(fullDate) {
        const date = new Date(fullDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day} ${month} ${year}`;
    }

    _findTasks() {
        const date = new Date();
        const currentDate = this._getDate(date);
        this._foundTasks = this._initialTasks.filter(task => {
            const taskDate = this._getDate(task.date);
            return taskDate === currentDate && task;
        });
        this._renderFilteredTasks(this._foundTasks);
    }

    setEventListeners = () => {
        this._todayButton.addEventListener('click', () => {
            this._findTasks();
        });
    }
}