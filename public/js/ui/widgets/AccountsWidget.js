/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  constructor( element ) {
    if (!element) {
      return new Error('Ошибка')
    }

    this.element = element;
    this.registerEvents();
    this.update()
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.closest('.account')) {
        this.onSelectAccount(event.target) 
      } else if (event.target.closest('.pull-right')) {
        App.getModal('createAccount').open();
      }
    })
  }

  update() {
    if (!User.current()) {
      return
    }

    Account.list(User.current(), (err, response) => {
      if (response.success) {
        this.clear();
        response.data.forEach(item => this.renderItem(item))
      }
    })
  }

  clear() {
    this.element.querySelectorAll('.account').forEach(item => item.parentNode.removeChild(item))
  }

  onSelectAccount( element ) {
    if (element.closest('.accounts-panel').querySelector('.active')) {
      if (element.closest('.account') === element.closest('.accounts-panel').querySelector('.active')) {
        element.closest('.account').classList.remove('active')
      } else {
        element.closest('.accounts-panel').querySelector('.active').classList.remove('active')
        element.closest('.account').classList.add('active')
      }
    } else {
      element.closest('.account').classList.add('active')
    }
      
    App.showPage('transactions', { account_id: element.closest('.account').dataset.id })
  }

  getAccountHTML( item ) {
    return `
    <li class="account" data-id=${item.id}>
      <a href="#">
        <span>${item.name}</span>
        <span>${item.sum} ₽</span>
      </a>
    </li>`
  }

  renderItem( item ) {
    document.querySelector('.accounts-panel').innerHTML += this.getAccountHTML(item)
  }
}
