import $ from 'jquery';

const defaults = {
  rootSelector: '.slider',
  prevButtonSeletor: '.slider-button--prev',
  nextButtonSeletor: '.slider-button--next',
  bulletButtonSeletor: '.bullet-item',
  pos: 'horizontal',
  autoplay: false,
  rollingSpeed: 300,
  animateSpeed: 300,
  interval: false,
  paging: true,
  activeIndex: 0
};

class Slider {
  constructor(option) {
    const options = $.extend({}, defaults, option);
    const rootElement = $(options.rootSelector);
    const prevButtonElement = rootElement.find(options.prevButtonSeletor);
    const nextButtonElement = rootElement.find(options.nextButtonSeletor);
    const bulletButtonElement = rootElement.find(options.bulletButtonSeletor);

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

  prev() {}
  next() {}
  motion() {}
}

const slider1 = new Slider({rootSelector: '#slider1'});