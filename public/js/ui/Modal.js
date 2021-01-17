/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  constructor(elem) {
    if (!elem) {
      return new Error('Ошибка');
    } else {
      this.element = elem;
      this.registerEvents();
    }
  }

  registerEvents() {
    this.element.querySelectorAll('[data-dismiss]').forEach(item => {
      item.addEventListener('click', () => {
        this.onClose();
      })
    })
  }

  onClose() {
    this.close()
  }

  unregisterEvents() {
    this.element.querySelectorAll('[data-dismiss]').forEach(item => {
      item.removeEventListener('click');
    })
  }

  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style.removeProperty('display')
  }
}
