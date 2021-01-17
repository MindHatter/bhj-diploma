/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  onSubmit( options ) {
    User.login(options, (err, response) => {
      if (response.success) {
        App.setState( 'user-logged' )
        App.getModal('login').close()
        App.getForm('login').element.reset()
      }
    })
  }
}
