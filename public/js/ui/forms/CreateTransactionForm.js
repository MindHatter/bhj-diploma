/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.element = element
    this.renderAccountsList()
  }

  renderAccountsList() {
    if (!User.current()) {
      return;
    }
    Account.list(User.current(),(err, response) => {
      if (response.success) {
        const select = this.element.querySelector( '.accounts-select' );
        select.innerHTML = '';
        response.data.forEach(item => select.innerHTML += `<option value="${item.id}">${item.name}</option>`);
      }
    })
  }

  onSubmit( options ) {
    Transaction.create(options, (err, response) => {
      console.log(options);
      if (response.success) {
        this.element.reset();
        App.getModal(this.element.closest('.modal').dataset.modalId).close();
        App.update()
      }
    })
  }
}
