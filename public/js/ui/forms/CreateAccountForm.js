/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  onSubmit( options ) {
    Account.create(options, (err, response) => {
      if (response.success) {
        App.getModal('createAccount').close()
        App.getForm('createAccount').element.reset()
        App.update();
      }
    })
  }
}
