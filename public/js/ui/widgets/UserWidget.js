/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */
class UserWidget {
  constructor( element ) {
    if (!element) {
      return new Error('Ошибка');
    } 

    this.element = element;
  }

  update() {
    let current = User.current();
    if (current) {
      document.querySelector('.user-name').textContent = current.name;
    } else {
      return new Error('Ошибка');
    }
  }
}
