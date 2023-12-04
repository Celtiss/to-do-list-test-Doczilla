export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _getResFromServer() {
        return (res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    // Получить задачи
    getTasks() {
        return fetch(`${this._url}/todos`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._getResFromServer());
    }
}