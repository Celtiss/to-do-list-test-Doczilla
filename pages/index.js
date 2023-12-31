'use strict';
import { Api } from '../utils/Api.js';
import { selectors, months } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { Task } from '../components/Task.js';
import { Popup } from '../components/Popup.js';
import { Search } from '../components/Search.js';
import { UnfullfilledTasks } from '../components/UnfulfilledTasks.js';
import { Calendar } from '../components/Calendar.js';
import { FilterToday } from '../components/FilterToday.js';
import { FilterWeek } from '../components/FilterWeek.js';
import { TasksSort } from '../components/TasksSort.js';

const initialTasks = [];
const tasksSection = document.querySelector(selectors.tasksSection);
const tasks = document.querySelector(selectors.tasks);
const tasksDate = tasks.querySelector(selectors.tasksDate);
const moreButton = tasks.querySelector(selectors.moreButton);
const preloader = tasks.querySelector(selectors.preloader);

const searchForm = document.querySelector(selectors.search);
const filterContainer = document.querySelector(selectors.filterContainer);
const sortContainer = document.querySelector(selectors.sortContainer);

// Экземпляр класса Api
const api = new Api({
    url: 'http://localhost:3000',
    headers: {
        'content-type': 'application/json'
    }
});

// Инициализация задач
const tasksList = new Section({
    items: initialTasks,
    renderer: (item) => {
    const taskElement = createTask(item, selectors.taskTemplate); 
    tasksList.setElement(taskElement);
    }
}, tasksSection, moreButton);

// Получить массив задач с Api
api.getTasks()
.then((tasks) => {
    console.log(tasks);
    preloader.style.display = 'none';
    tasks.forEach(task => {
        initialTasks.push(task);
    });
    tasksList.renderItems(); // Отрисовываем карточки задач
})
.catch(err => console.log(err));

// Создание экземпляра задачки
function createTask (data, taskTemplate) {
    const task = new Task(data, taskTemplate, handleTaskClick, getDate); 
    const taskElement = task.generateTask();
    return taskElement;
}

// Приводим дату в нужный формат
const getDate = function(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}.${month}.${year} ${hours}:${minutes == '0' ? '00' : minutes}`;
}

// Получить текущую дату
const getCurrentDate = function() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    return `${day} ${month} ${year}`;
}

tasksDate.textContent = getCurrentDate();

// Открытие попапа
const popup = new Popup(selectors.popup, getDate);
const handleTaskClick = function(taskInfo) {
    popup.open(taskInfo);
}

popup.setEventListeners();

// Поиск по названию
const search = new Search ({
    initialTasks: initialTasks,
    renderFoundTasks: (foundTasks) => {
        tasksList.clear();
        foundTasks.forEach((task) => {
            const taskElement = createTask(task, selectors.taskTemplate);
            tasksList.setElement(taskElement);
        })
    }
}, searchForm);

search.setEventListeners();

// Фильтр невыполненных задач
const unfullfilledTasks = new UnfullfilledTasks({
    initialTasks: initialTasks,
    renderFilteredTasks: (foundTasks) => {
        tasksList.clear();
        foundTasks.forEach((task) => {
            const taskElement = createTask(task, selectors.taskTemplate);
            tasksList.setElement(taskElement);
        })
    }
}, filterContainer)

unfullfilledTasks.setEventListeners();

// Фильтр по календарю
const calendar = new Calendar({
    initialTasks: initialTasks,
    renderFilteredTasks: (foundTasks) => {
        tasksList.clear();
        foundTasks.forEach((task) => {
            const taskElement = createTask(task, selectors.taskTemplate);
            tasksList.setElement(taskElement);
        })
    }
}, $( "#datepicker" ));
calendar.showDatePicker();
calendar.setEventListeners();

// Фильтр на сегодняшнюю дату
const filterToday = new FilterToday({
    initialTasks: initialTasks,
    renderFilteredTasks: (foundTasks) => {
        tasksList.clear();
        foundTasks.forEach((task) => {
            const taskElement = createTask(task, selectors.taskTemplate);
            tasksList.setElement(taskElement);
        })
    }
}, filterContainer);
filterToday.setEventListeners();

// Фильтр задач на текущую неделю
const filterWeek = new FilterWeek({
    initialTasks: initialTasks,
    renderFilteredTasks: (foundTasks) => {
        tasksList.clear();
        foundTasks.forEach((task) => {
            const taskElement = createTask(task, selectors.taskTemplate);
            tasksList.setElement(taskElement);
        })
    }
}, filterContainer);
filterWeek.setEventListeners();

// Сортировка задач
const tasksSort = new TasksSort({
    initialTasks: initialTasks,
    renderSortedTasks: (foundTasks) => {
        tasksList.clear();
        foundTasks.forEach((task) => {
            const taskElement = createTask(task, selectors.taskTemplate);
            tasksList.setElement(taskElement);
        })
    }
}, sortContainer);
tasksSort.setEventListeners();