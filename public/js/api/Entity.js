/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
    static url = '';
    static list(data, callback = f => f) {
        return createRequest({
            url: this.url,
            method: 'GET',
            responseType: 'json',
            data,
            callback: callback
        });
    }

    static create(data, callback = f => f) {
        let modifiedData = Object.assign({ _method: 'PUT' }, data );
        return createRequest({
            url: this.url,
            method: 'POST',
            responseType: 'json',
            data: modifiedData,
            callback: callback
        });
    }

    static get(id = '', data, callback = f => f) {
        return createRequest({
            url: this.url + '/' + id,
            method: 'GET',
            responseType: 'json',
            data,
            callback: callback
        });
    }

    static remove( id = '', data, callback = f => f) {
        return createRequest({
            url: this.url,
            method: 'POST',
            responseType: 'json',
            data: Object.assign({ _method: 'DELETE', id: id}, data ),
            callback
        });
    }
}
