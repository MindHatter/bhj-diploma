/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  onSubmit( options ) {
    User.register(options, (err, response) => {
      if (response.success) {
        App.setState( 'user-logged' )
        App.getModal('register').close()
        App.getForm('register').element.reset()
      }
    })
  }
}
