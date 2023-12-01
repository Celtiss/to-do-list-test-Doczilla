'use strict';
import { Api } from '../utils/Api.js';
import { selectors } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { Task } from '../components/Task.js';
import { Popup } from '../components/Popup.js';

$( "#datepicker" ).datepicker();
const initialTasks = [];
const tasksSection = document.querySelector(selectors.tasksSection);

// Экземпляр класса Api
const api = new Api({
    url: 'http://localhost:3000',
    headers: {
        'content-type': 'application/json'
    }
});

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

// Открытие попапа
const popup = new Popup(selectors.popup, getDate);
const handleTaskClick = function(taskInfo) {
    popup.open(taskInfo);
}

popup.setEventListeners();

// Инициализация задач
const tasksList = new Section({
    items: initialTasks,
    renderer: (item) => {
    const taskElement = createTask(item, selectors.taskTemplate); 
    tasksList.setElement(taskElement);
    }
}, tasksSection);

// Получить массив задач с Api
api.getTasks()
.then((tasks) => {
    console.log(tasks);
    tasks.forEach(task => {
        initialTasks.push(task);
    });
    tasksList.renderItems(); // Отрисовываем карточки задач
})
.catch(err => console.log(err));

//Создание экземпляра задачки
function createTask (data, taskTemplate) {
    const task = new Task(data, taskTemplate, handleTaskClick, getDate); 
    const taskElement = task.generateTask();
    return taskElement;
}


