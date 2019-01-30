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
    const settings = $.extend({}, defaults, option);
    const rootElement = $(settings.rootSelector);
    const prevButtonElement = rootElement.find(settings.prevButtonSeletor);
    const nextButtonElement = rootElement.find(settings.nextButtonSeletor);
    const bulletButtonElement = rootElement.find(settings.bulletButtonSeletor);
    this.activeIndex = 0;
    console.log(settings);

    rootElement
      .on('click', prevButtonElement, () => {
        this.prev();
      })
      .on('click', nextButtonElement, () => {
        this.next();
      })
      .on('click', bulletButtonElement, () => {
        this.motion();
      });
  }

  prev() {}
  next() {}
  motion() {}
  slideTo() {}
}

$(() => {
  const slider1 = new Slider();
});
