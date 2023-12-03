export class FilterWeek {
    constructor ({initialTasks, renderFilteredTasks}, filterContainer) {
        this._weekButton = filterContainer.querySelector('.filter__button_type_week');
        this._initialTasks = initialTasks;
        this._renderFilteredTasks = renderFilteredTasks;
        this._foundTasks = [];
    }

    _getWeekBounds() {
        const currentDate = new Date();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        return { startOfWeek, endOfWeek };
    }

    _getDate(fullDate) {
        const date = new Date(fullDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day} ${month} ${year}`;
    }

    _findTasks() {
        const { startOfWeek, endOfWeek } = this._getWeekBounds();
        this._foundTasks = this._initialTasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });

        this._renderFilteredTasks(this._foundTasks);
    }

    setEventListeners = () => {
        this._weekButton.addEventListener('click', () => {
            this._findTasks();
        });
    }
}