/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  static unsetCurrent() {
    delete localStorage.user;
  }

  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  static fetch( data, callback = f => f  ) {
    return createRequest({
      url: '/user/current',
      method: 'GET',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user)
        } else {
          this.unsetCurrent()
        }
      callback(err, response)
      }
    })
  }

  static login( data, callback = f => f  ) {
    return createRequest({
      url: '/user/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user)
        }
        callback(err,response)
      }
    })
  }

  static register( data, callback = f => f  ) {
    return createRequest({
      url: '/user/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user)
        }
        callback(err,response)
      }
    })
  }

  static logout( data, callback = f => f  ) {
    return createRequest({
      url: '/user/logout',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success) {
          this.unsetCurrent()
        }
        callback(err,response)
      }
    })
  }
}
