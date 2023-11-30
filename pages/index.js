'use strict';
import {Api} from '../utils/Api.js';

$( "#datepicker" ).datepicker();

// Экземпляр класса Api
const api = new Api({
    url: 'http://localhost:3000',
    headers: {
        'content-type': 'application/json'
    }
});

// Получить задачи
api.getTasks()
.then((tasks) => {
    console.log(tasks);
})
.catch(err => console.log(err));
