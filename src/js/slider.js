import $ from 'jquery';

const defaluts = {
  direction: 'horizontal',
  rootSelector: '.slider',
  activeClass: 'active',
  activeIndex: 0,
  activeItemSelector: '.slider-item',
  prevButtonSelector: '.slider-button--prev',
  nextButtonSelector: '.slider-button--next',
  loop: false,
  min: 0,
  max: 0
};

class Slider {
  constructor(option) {
    const settings = Object.assign({}, defaluts, option);
    const rootElement = $(settings.rootSelector);

    const elements = Object.assign({}, {
        prevButton: rootElement.find(settings.prevButtonSelector),
        nextButton: rootElement.find(settings.nextButtonSelector),
        currentItem: rootElement.find(settings.activeItemSelector)
    });

    const state = Object.assign({}, {
        currentIndex: settings.activeIndex,
        activeClass: settings.activeClass,
        rollingItem: settings.loop
    });

    settings.max = rootElement.find(settings.activeItemSelector).length - 1;

    Object.assign(this, {
      settings,
      elements,
      state
    });

    if (settings.direction === 'horizontal') {
      elements.currentItem.css('left', '100%');
      elements.currentItem.eq(state.currentIndex).css('left', 0);
      elements.prevButton.addClass(state.activeClass);
      if (settings.loop) {
        elements.prevButton.removeClass(state.activeClass);
      }
    }

    elements.prevButton.on('click', () => {
      this.prev();
    });
    elements.nextButton.on('click', () => {
      this.next();
    });
  }

  prev() {
    let { min, max, loop } = this.settings;
    let { currentIndex } = this.state;

    if (currentIndex === min && loop) {
      this.state.currentIndex = max;
      this.motion(currentIndex);
      return false;
    }

    if (currentIndex > min) {
      this.state.currentIndex--;
      this.motion(currentIndex);
    } else {
      currentIndex = Math.min(currentIndex, min);
    }
    console.log(currentIndex);
  }

  next() {
    let { max, min, loop } = this.settings;
    let { currentIndex } = this.state;

    if (currentIndex === max && loop) {
      this.state.currentIndex = min;
      this.motion(currentIndex);
      return false;
    }

    if (currentIndex < max) {
      this.state.currentIndex++;
      this.motion(currentIndex);
    } else {
      currentIndex = Math.max(currentIndex, max);
    }
    console.log(currentIndex);
  }

  motion(newIdx) {
    let { currentIndex, activeClass } = this.state;
    let { min, max, loop } = this.settings;
    const { currentItem, nextButton, prevButton } = this.elements;

    if (currentIndex < newIdx) {
      currentItem.eq(currentIndex).css('left', 0);
      currentItem.eq(newIdx).css('left', '-100%');
      this.activeButton();

      if (currentIndex === min) {
        prevButton.addClass(activeClass);
        if (loop) {
          prevButton.removeClass(activeClass);
        }
      }
    } else if (currentIndex > newIdx) {
      currentItem.eq(currentIndex).css('left', 0);
      currentItem.eq(newIdx).css('left', '100%');
      this.activeButton();

      if (currentIndex === max) {
        nextButton.addClass(activeClass);
        if (loop) {
          nextButton.removeClass(activeClass);
        }
      }
    }
  }

  activeButton() {
    const { prevButton, nextButton } = this.elements;
    const { activeClass } = this.state;

    if (prevButton.hasClass(activeClass)) {
      prevButton.removeClass(activeClass);
    } else {
      nextButton.removeClass(activeClass);
    }
  }
}

const slider1 = new Slider({
  rootSelector: '#slider1'
});

const slider2 = new Slider({
  rootSelector: '#slider2',
  loop: true
});

// console.log(slider1, slider2);
