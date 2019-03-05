import $ from 'jquery';
import Pagination from './components/pagination';

// ================================== slider ==================================
// slider 옵션 값
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
  max: 0,
  pagination: false
};

class Slider {
  constructor(option) {
    const settings = Object.assign({}, defaluts, option); // 옵션 변경을 위한 설정
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

    // pagination
    const pagination = new Pagination({
      item: elements.currentItem,
      bulletBulid: elements.currentItem.length,
      bulletActiveIndex: state.currentIndex,
      clickable: true,
      changeSlide: this.setSlide.bind(this) // this 강제로 바꾸기 (.bind(this) , .call(this) , .apply(this))
    });

    // 최대값 설정
    settings.max = rootElement.find(settings.activeItemSelector).length - 1;

    Object.assign(this, {
      settings,
      elements,
      state,
      pagination
    });

    // 초기 화면 생성
    if (settings.direction === 'horizontal') {
      elements.currentItem.css('left', '100%');
      elements.currentItem.eq(state.currentIndex).css('left', 0);
      elements.prevButton.addClass(state.activeClass);
      if (settings.loop) {
        elements.prevButton.removeClass(state.activeClass);
      }
    }

    // 이전 버튼 클릭
    elements.prevButton.on('click', () => {
      this.prev();
      if (settings.pagination) {
        pagination.bullets(state.currentIndex);
      }
    });

    // 다음 버튼 클릭
    elements.nextButton.on('click', () => {
      this.next();
      if (settings.pagination) {
        pagination.bullets(state.currentIndex);
      }
    });
  }

  // 설정 : 이전
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

  // 설정 : 다음
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

  // pagination index 값 전달받기
  setSlide(index) {
    // 현재 페이지 index 값과 클릭 시 index 값을 비교...해야는데....
    // index : 클릭한 페이지의 index 값
    // currentIndex : 현재 페이지 index 값
    const { currentIndex } = this.state;
    // this.state.currentIndex = ...?
    this.motion(index);
    console.log(index, this.state.currentIndex,currentIndex);
  }

  // 설정 : 슬라이드 이동 animate
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
