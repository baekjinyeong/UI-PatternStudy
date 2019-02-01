import $ from 'jquery';

const defaluts = {
  direction: 'horizontal',
  rootSelector: '.slider',
  activeClass: 'active',
  activeIndex: 0,
  activeItemSelector: '.slider-item',
  prevButtonSelector: '.slider-button--prev',
  nextButtonSelector: '.slider-button--next',
  activeRolling: false
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
      min: 0,
      max: rootElement.find(settings.activeItemSelector).length - 1,
      activeClass: settings.activeClass,
      rollingItem: settings.activeRolling
    });

    if (settings.direction === 'horizontal') {
      this.currentItem.css('left', '100%');
      this.currentItem.eq(this.currentIndex).css('left', 0);
      this.prevButton.addClass(settings.activeClass);
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
      this.activeButton();

      if (newIdx === this.max) {
        this.nextButton.addClass(this.activeClass);
      }
    } else if (this.currentIndex > newIdx) {
      this.currentItem.eq(newIdx).css('left', 0);
      this.currentItem.eq(this.currentIndex).css('left', '100%');
      this.activeButton();

      if (newIdx === this.min) {
        this.prevButton.addClass(this.activeClass);
      }
    }
    console.log(this.currentIndex, newIdx, this.max, this.min);
  }

  activeButton() {
    if (this.prevButton.hasClass(this.activeClass)) {
      this.prevButton.removeClass(this.activeClass);
    } else {
      this.nextButton.removeClass(this.activeClass);
    }
  }
}

const slider1 = new Slider({
  rootSelector: '#slider1'
});

const slider2 = new Slider({
  rootSelector: '#slider2',
  activeRolling: true
});

console.log(slider1, slider2);
