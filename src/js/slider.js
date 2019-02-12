import $ from 'jquery';

// ================================== pagination ==================================

// pagination 옵션 값
const paginationDefaults = {
  type: 'bullets',
  rootSelector: '.slider-pagination',
  bulletSelector: '.pagination-bullet',
  bulletsActiveClass: 'active',
  bulletBulid: 0
};

export default class Pagination {
  constructor(option) {
    /*
      1. slider 갯수만큼 블릿 생성한다.
      2. slider의 currentIndex 값을 받아온다.
      3. currentIndex 값에 active 클래스 추가한다.
      4. 해당 블릿 클릭 시 currentIndex 로 이동한다.
    */
    const settings = Object.assign({}, paginationDefaults, option);
    const rootElement = $(settings.rootSelector);

    const elements = Object.assign({},{
        bulletItem: rootElement.find(settings.bulletSelector)
    });

    const state = Object.assign({},{
        paginationNumber: settings.bulletBulid,
        activeClass: settings.bulletsActiveClass
    });

    Object.assign(this, {
      settings,
      elements,
      state
    });

    // 블릿 생성하기
    if (settings.type === 'bullets') {
      let date = [];
      const print = document.querySelector('.slider-pagination');
      for (let i = 0; i < state.paginationNumber; i++) {
        if (i === 0) {
          date.push(`<span class="pagination-bullet active">${i}</span>`);
        } else {
          date.push(`<span class="pagination-bullet">${i}</span>`);
        }
      }
      print.innerHTML = date.join('');
    }
  }
}

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

    // pagination 초기값 세팅
    const pagination = new Pagination({
      bulletBulid: elements.currentItem.length
    });

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

    if (settings.pagination) {
      pagination;
    }

    // 이전 버튼 클릭
    elements.prevButton.on('click', () => {
      this.prev();
    });

    // 다음 버튼 클릭
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
      this.state.currentIndex = Math.min(currentIndex, min);
    }
  }

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

  // 슬라이드 이동 animate
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

const slider3 = new Slider({
  rootSelector: '#slider3',
  loop: true,
  pagination: true
});
