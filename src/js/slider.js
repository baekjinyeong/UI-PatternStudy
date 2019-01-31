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

    $.extend(this, {
      settings,
      prevButton: rootElement.find(settings.prevButtonSelector),
      nextButton: rootElement.find(settings.nextButtonSelector),
      currentItem: rootElement.find(settings.activeItemSelector),
      currentIndex: settings.activeIndex,
      min: settings.indexMinNumber,
      max: settings.indexMaxNumber,
      activeClass: settings.activeClass
    });

    if (settings.direction === 'horizontal') {
      this.currentItem.css('left', '100%');
      this.currentItem.eq(this.currentIndex).css('left', 0);
    }

    this.prevButton.on('click', () => {
      this.prev();
    });
    this.nextButton.on('click', () => {
      this.next();
    });
  }

  prev() {
    if (this.currentIndex <= this.min) {
      this.currentIndex = this.min;
    } else {
      this.motion(this.currentIndex - 1);
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex >= this.max) {
      this.currentIndex = this.max;
    } else {
      this.motion(this.currentIndex + 1);
      this.currentIndex++;
    }
  }

  motion(newIdx) {
    if (this.currentIndex < newIdx) {
      this.currentItem.eq(newIdx).css('left', 0);
      this.currentItem.eq(this.currentIndex).css('left', '-100%');
      if (newIdx === this.max) {
        this.nextButton.addClass(this.activeClass);
      }
    } else if (this.currentIndex > newIdx) {
      this.currentItem.eq(newIdx).css('left', 0);
      this.currentItem.eq(this.currentIndex).css('left', '100%');
      if (newIdx === this.min) {
        this.prevButton.addClass(this.activeClass);
      }
    }
    console.log(this.currentIndex, newIdx, this.max, this.min);
  }
}

const slider = new Slider();
