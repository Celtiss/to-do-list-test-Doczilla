export class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems () {
        this._renderedItems.forEach((item) => {
            this._renderer(item);
        });
    }

    setElement (element) {
        this._container.prepend(element);
    }

    clear() {
        this._container.innerHTML = '';
    }
}