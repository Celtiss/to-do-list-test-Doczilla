export class TasksSort {
    constructor({initialTasks, renderSortedTasks}, sortContainer) {
        this._tasks = initialTasks;
        this._sortButton = sortContainer.querySelector('.tasks__sort-btn');
        this._renderSortedTasks = renderSortedTasks;
        this._foundTasks = [];
        this._sortOrder = 'asc'; // По умолчанию сортируем задачи по возрастанию
    }

    _toggleSortOrder() {
        this._sortOrder = this._sortOrder === 'asc' ? 'desc' : 'asc';
    }

    _sortTasks() {
        if (this._sortOrder === 'asc') {
            this._tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            this._tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        this._renderSortedTasks(this._tasks);
    }

    _toggleSort() {
        this._toggleSortOrder();
        this._sortTasks();
    }

    setEventListeners = () => {
        this._sortButton.addEventListener('click', () => {
            this._toggleSort();
        });
    }
}