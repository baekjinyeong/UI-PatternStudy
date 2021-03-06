import $ from 'jquery';
import Pagination from './components/pagination';

// ================================== slider ==================================
// slider 옵션 값
const defaluts = {
  // General
  direction: 'horizontal',
  activeClass: 'active',
  activeIndex: 0,
  animateSpeed: 300,

  // Elements
  rootSelector: '.slider',
  activeItemSelectorClass: 'slider-item',
  prevButtonSelectorClass: 'slider-button--prev',
  nextButtonSelectorClass: 'slider-button--next',

  // Carousel
  loop: false,
  min: 0,
  max: 0,

  // Pagination
  pagination: false,
  clickable: true,

  // Auto
  autoPlay: false,
  autoDelay: 0,
  autoStart: true,
  autoDirection: 'next'
};

class Slider {
  constructor(option) {
    const settings = Object.assign({}, defaluts, option); // 옵션 변경을 위한 설정
    const rootElement = $(settings.rootSelector);

    const elements = Object.assign({}, {
        prevButton: rootElement.find(`.${settings.prevButtonSelectorClass}`),
        nextButton: rootElement.find(`.${settings.nextButtonSelectorClass}`),
        currentItem: rootElement.find(`.${settings.activeItemSelectorClass}`)
    });

    const state = Object.assign({}, {
        currentIndex: settings.activeIndex,
        activeClass: settings.activeClass,
        rollingItem: settings.loop
    });

    // pagination
    const pagination = new Pagination({
      bulletsLength: elements.currentItem.length,
      bulletActiveIndex: state.currentIndex,
      bulletClickable: settings.clickable,
      slideRootSelector: settings.rootSelector,
      changeSlide: this.setSlide.bind(this) // this 강제로 고정시키기 (.bind(this) , .call(this) , .apply(this))
    });

    // 최대값 설정
    settings.max = rootElement.find(`.${settings.activeItemSelectorClass}`).length - 1;

    Object.assign(this, {
      settings,
      elements,
      state,
      pagination
    });

    // 세팅: init
    const init = () => {
      if (settings.direction === 'horizontal') {
        elements.currentItem.css('left', '100%');
        elements.currentItem.eq(state.currentIndex).css('left', 0);
      } else if (settings.direction === 'vertical') {
        elements.currentItem.css('top', '100%');
        elements.currentItem.eq(state.currentIndex).css('top', 0);
      }
      elements.prevButton.addClass(state.activeClass);
      if (settings.loop) {
        elements.prevButton.removeClass(state.activeClass);
      }
    };
    init();

    // 세팅: button Previous
    elements.prevButton.on('click', () => {
      this.prev();
      if (settings.pagination) {
        pagination.bullets(state.currentIndex);
      }
    });

    // 세팅: button Next
    elements.nextButton.on('click', () => {
      this.next();
      if (settings.pagination) {
        pagination.bullets(state.currentIndex);
      }
    });

    // 세팅: pagination
    if (settings.pagination) {
      pagination;
    }

    // 세팅: autopaly
    if (settings.autoPlay) {
      this.autoPlay();
    }
  }

  // pagination index 값 전달받기
  setSlide(index) {
    const { currentIndex } = this.state;
    this.state.currentIndex = index;

    if (currentIndex < index) {
      this.motion(currentIndex);
    } else if (currentIndex > index) {
      this.motion(currentIndex);
    }
  }

  // 옵션 : Previous
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
      this.state.currentIndex = Math.min(currentIndex, min);
    }
  }

  // 옵션 : Next
  next() {
    const { max, min, loop } = this.settings;
    const { currentIndex } = this.state;

    if (currentIndex === max && loop) {
      this.state.currentIndex = min;
      this.motion(currentIndex);
      return false;
    }

    if (currentIndex < max) {
      this.state.currentIndex++;
      this.motion(currentIndex);
    } else {
      this.state.currentIndex = Math.max(currentIndex, max);
    }
  }

  // 옵션 : AutoPlay
  autoPlay() {
    const { autoDelay } = this.settings;

    setInterval(() => {
      this.next();
      this.pagination.bullets(this.state.currentIndex);
    }, autoDelay);
  }

  // 설정 : 슬라이드 이동 animate
  motion(index) {
    let { currentIndex, activeClass } = this.state;
    let { min, max, loop, animateSpeed, direction } = this.settings;
    const { currentItem, nextButton, prevButton } = this.elements;
    console.log(`index: ${index}, currentIndex: ${currentIndex}`)
    currentItem.eq(currentIndex).css('left', 0);

    // 이전 모션
    if (currentIndex < index) {
      this.activeButton();

      if (currentIndex === min) {
        prevButton.addClass(activeClass);

        if (loop) {
          prevButton.removeClass(activeClass);
        }
      }

      // 가로 슬라이드
      if (direction === 'horizontal') {
        currentItem.eq(currentIndex).css('left','-100%').stop().animate({ left: 0 }, animateSpeed);
        currentItem.eq(index).stop().animate({ left: '100%' }, animateSpeed);

        // 세로 슬라이드
      } else {
        currentItem.eq(currentIndex).css('top','-100%').stop().animate({ top: 0 }, animateSpeed);
        currentItem.eq(index).stop().animate({ top: '100%' }, animateSpeed);
      }
    }

    // 다음 모션
    if (currentIndex > index) {
      this.activeButton();

      if (currentIndex === max) {
        nextButton.addClass(activeClass);

        if (loop) {
          nextButton.removeClass(activeClass);
        }
      }

      // 가로 슬라이드
      if (direction === 'horizontal') {
        currentItem.eq(currentIndex).css('left','100%').stop().animate({ left: 0 }, animateSpeed);
        currentItem.eq(index).stop().animate({ left: '-100%' }, animateSpeed);

      // 세로 슬라이드
      } else {
        currentItem.eq(currentIndex).css('top','100%').stop().animate({ top: 0 }, animateSpeed);
        currentItem.eq(index).stop().animate({ top: '-100%' }, animateSpeed);
      }
    }
  }

  // 설정 : 화살표 버튼 활성화
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

// type : defaults
const slider1 = new Slider({
  rootSelector: '#slider1'
});

// type : loop
const slider2 = new Slider({
  rootSelector: '#slider2',
  loop: true
});

// type : pagination
const slider3 = new Slider({
  rootSelector: '#slider3',
  loop: true,
  pagination: true
});

// type : autoPlay
const slider4 = new Slider({
  rootSelector: '#slider4',
  loop: true,
  pagination: true,
  clickable: false,
  // autoPlay: true,
  // autoDelay: 3000
});

// type : vertical slider
const slider5 = new Slider({
  rootSelector: '#slider5',
  loop: true,
  pagination: true,
  direction: 'vertical'
});

// type : Multiple slider
const slider6 = new Slider({
  rootSelector: '#slider6',
  loop: true,
  pagination: true
});
window.slider = slider1;
