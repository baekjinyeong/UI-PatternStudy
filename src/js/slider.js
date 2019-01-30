import $ from 'jquery';

const defaluts = {
  direction: 'horizontal',
  rootSelector: '.slider',
  activeClass: 'active',
  activeIndex: 0,
  activeItemSelector: '.slider-item',
  prevButtonSelector: '.slider-button--prev',
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
    this.currentItem = $(settings.activeItemSelector);
    this.min = settings.indexMinNumber;
    this.max = settings.indexMaxNumber;

    if (settings.direction === 'horizontal') {
      this.currentItem.css('left', '100%');
      this.currentItem.eq(this.currentIndex).css('left', 0);
    }

    prevButton.on('click', () => {
      this.prev();
    });
    nextButton.on('click', () => {
      this.next();
    });

  }

  prev() {
    this.motion(this.currentIndex - 1);
    this.currentIndex--;
  }
  next() {
    this.motion(this.currentIndex + 1);
    this.currentIndex++;
  }
  motion(newIdx) {
    if (this.currentIndex < newIdx) {
      this.currentItem.eq(newIdx).css('left', 0);
      this.currentItem.eq(this.currentIndex).css('left', '-100%');
      if (newIdx === this.max) {
        return false;
      }
    } else if (this.currentIndex > newIdx) {
      this.currentItem.eq(newIdx).css('left', 0);
      this.currentItem.eq(this.currentIndex).css('left', '100%');
      if (newIdx === this.min) {
        return false;
      }
    }
    console.log(this.currentIndex, newIdx);
  }
}

const slider = new Slider();
