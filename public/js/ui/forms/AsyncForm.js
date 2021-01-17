/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  constructor(element) {
    if (!element) {
      return new Error('Ошибка');
    } 

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit',(e) => {
      e.preventDefault();
      this.submit()
    })
  }

  getData() {
    let obj = {}
    const formData = new FormData(this.element)
    const entries = formData.entries()

    for (let item of entries) {
      const key = item[0], value = item[1];
      obj[key] = value;
    }

    return obj;
  }

  onSubmit( options ) {
  }

  submit() {
    this.onSubmit(this.getData())
  }
}
