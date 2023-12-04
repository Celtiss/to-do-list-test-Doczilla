export class Popup {
    constructor (popupSelector, getDate) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._getDate = getDate;
    }

    _fillPopup(taskInfo) {
        const chechbox = this._popup.querySelector('.checkbox');
        this._popup.querySelector('.popup__title').textContent = taskInfo.name;
        this._popup.querySelector('.popup__date').textContent = this._getDate(taskInfo.date);
        taskInfo.status ? chechbox.checked = true : chechbox.checked = false;
        this._popup.querySelector('.popup__fullDesc').textContent = taskInfo.fullDesc;
    }

    open (taskInfo) {
        this._fillPopup(taskInfo);
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners () {
        this._popup.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup_is-opened')) {
                this.close();
            }
            if (event.target.classList.contains('popup__btn-close')) { 
                this.close();
            } 
        })
    }

    _handleEscClose (event) {
        if(event.key === 'Escape') {
            this.close();
        }
    }
}