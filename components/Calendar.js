export class Calendar {
    constructor ({initialTasks, renderFilteredTasks}, datepicker) {
        this._calendar = datepicker;
        this._initialTasks = initialTasks;
        this._renderFilteredTasks = renderFilteredTasks;
        this._foundTasks = [];
    }

    showDatePicker() {
        this._calendar.datepicker();
    }

    _getDate(fullDate) {
        const date = new Date(fullDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day} ${month} ${year}`;
    }

    _findTasks(date) {
        const currentDate = this._getDate(date);
        this._foundTasks = this._initialTasks.filter(task => {
            const taskDate = this._getDate(task.date);
            return taskDate === currentDate && task;
        });
        this._renderFilteredTasks(this._foundTasks);
    }

    setEventListeners = () => {
        const findTasksfromListener = this._findTasks.bind(this);
        this._calendar.on("change", function () {
            const selectedDate = $(this).datepicker("getDate");
            findTasksfromListener(selectedDate);
        });
    }
}