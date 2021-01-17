/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  constructor( element ) {
    if (!element) {
      return;
    }
    this.element = element;
    console.log(this.element);
    this.registerEvents();
  }

  update() {
    this.render(this.lastOptions)
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-account')) {
        this.removeAccount()
      }

      if (event.target.closest('.transaction__remove')) {
        this.removeTransaction(event.target.dataset.id)
      }
    })
  }

  removeAccount() {
    if (!this.lastOptions) {
      return;
    }

    if (confirm('Вы точно хотите удалить счёт?')) {
      Account.remove(this.lastOptions.account_id, (err, response) => {})
      this.clear()
      App.update()
    }
  }

  removeTransaction( id ) {
    if (confirm('Вы точно хотите удалить счёт?')) {
      Transaction.remove(id, (err, response) => {})
      App.update()
    }
  }

  render( options ) {
    this.lastOptions = options;
    
    if (!options) {
      return new Error ('Ошибка')
    }

    Account.get(options.account_id, User.current(), (err, response) => {
      if (response.success) {
        this.renderTitle(response.data.name)
      }
    })

    Transaction.list(options, (err,response) => {
      if (response.success) {
        this.renderTransactions(response.data);
      }
    })

  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null
  }

  renderTitle( name ) {
    this.element.querySelector('.content-title').textContent = name;
  }

  formatDate( date ) {
    let day = date.slice(8,10)
    let year = ' ' + date.slice(0,4) + ' г. '
    let month;
    let oldMonth = date.slice(5,7)

    if (oldMonth === '01') {
      month = ' января'
    } else if (oldMonth === '02') {
      month = ' февраля'
    } else if (oldMonth === '03') {
       month = ' марта'
    } else if (oldMonth === '04') {
       month = ' апреля'
    } else if (oldMonth === '05') {
       month = ' мая'
    } else if (oldMonth === '06') {
       month = ' июня'
    } else if (oldMonth === '07') {
       month = ' июля'
    } else if (oldMonth === '08') {
       month = ' августа'
    } else if (oldMonth === '09') {
       month = ' сентября'
    } else if (oldMonth === '10') {
       month = ' октября'
    } else if (oldMonth === '11') {
       month = ' ноября'
    } else if (oldMonth === '12') {
       month = ' декабря'
    }

    let hours = Number(date.slice(11,13)) + 3 + ':'
    let minutes = date.slice(14,16)
    return day + month + year + 'в ' + hours + minutes
  }

  getTransactionHTML( item ) {
    return `
    <div class="transaction transaction_${item.type.toLowerCase()} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <!-- дата -->
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        <!--  сумма -->
            ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <!-- в data-id нужно поместить id -->
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
    </div>`
  }

  renderTransactions( data ) {
    this.element.querySelector('.content').innerHTML = '';
    data.forEach(item => this.element.querySelector('.content').innerHTML += this.getTransactionHTML(item))
  }
}
