/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    document.querySelector('.sidebar-toggle').addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse')
    })
  }

  static initAuthLinks() {
    document.querySelector('.menu-item_register').addEventListener('click', (e) => {
      e.preventDefault()
      App.getModal('register').open();
    })

    document.querySelector('.menu-item_login').addEventListener('click', (e) => {
      e.preventDefault()
      App.getModal('login').open()
    })

    document.querySelector('.menu-item_logout').addEventListener('click', () => {
      User.logout(User.current(), (err,response) => {
        if (response.success) {
          App.setState('init')
        }
      })
    })
  }
}
