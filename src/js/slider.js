import $ from 'jquery';

const defaults = {
  rootSelector: '.slider',
  prevButtonSeletor: '.slider-button--prev',
  nextButtonSeletor: '.slider-button--next',
  bulletButtonSeletor: '.bullet-item',
  count: 0,
  pos: 'horizontal',
  autoplay: false,
  rollingSpeed: 300,
  animateSpeed: 300,
  interval: false,
  paging: true
};

class Slider {
  constructor(option) {
    this.activeIndex = 0;

    const obj = $.extend({}, defaults, option);
    const rootElement = $(obj.rootSelector);
    const prevButtonElement = rootElement.find(obj.prevButtonSeletor);
    const nextButtonElement = rootElement.find(obj.nextButtonSeletor);
    const bulletButtonElement = rootElement.find(obj.bulletButtonSeletor);

    rootElement
      .on('click', nextButtonElement, () => {
        this.next();
      })
      .on('click', prevButtonElement, () => {
        this.prev();
      })
      .on('click', bulletButtonElement, () => {
        this.motion();
      });
  }

  prev() {

  }
  next() {

  }
  motion() {

  }
}

const slider1 = new Slider({rootElement: 'slider1'});
