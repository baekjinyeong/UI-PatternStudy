import $ from 'jquery';

const defaluts = {
  direction: 'horizontal',
  rootSelector: '.slider',
  activeClass: 'active',
  activeIndex: 0,
  activeItemSelector: '.item-slider',
  prevButtonSelector: '.silder-button--prev',
  nextButtonSelector: '.slider-button--next',
  indexMinNumber: 0,
  indexMaxNumber: 4
};

class Slider {
  constructor(option) {
    const settings = $.extend({}, defaluts, option);
    const rootElement = $(settings.rootSelector);
    const prevButton = rootElement.find(settings.prevButtonSelector);
    const nextButton = rootElement.find(settings.nextButtonSelector);

    this.currentIndex = settings.activeIndex;
    this.settings = settings;
    this.currentItem = settings.activeItemSelector;

    if (settings.direction === 'horizontal') {
      this.currentItem.css('left', '100%');
      this.currentItem.eq(this.activeIndex).css('left', 0);
    }

    prevButton.on('click', () => {this.prev();});
    nextButton.on('click', () => {this.next();});

  }

  prev() {
    this.activeIndex--;
    this.motion(this.activeIndex - 1);
  }
  next() {
    this.activeIndex++;
    this.motion(this.activeIndex + 1);
  }
  motion(newIdx) {
    if (this.activeIndex < newIdx) {
      this.currentItem.eq(newIdx).css('left', 0);
    } else if (this.activeIndex > newIdx) {
      this.currentItem.eq(newIdx).css('left', 0);
    }
  }
}

const slider = new Slider();
