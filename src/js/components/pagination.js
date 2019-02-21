import $ from 'jquery';

// ================================== pagination ==================================
// pagination 옵션 값
const paginationDefaults = {
  type: 'bullets',
  rootSelector: '.slider-pagination',
  bulletSelector: '.pagination-bullet',
  bulletsActiveClass: 'active',
  bulletBulid: 0,
  bulletActiveIndex: 0,
  clickable: false, // 블릿 클릭 가능여부
  item: ''
};

export default class Pagination {
  constructor(option) {
    /*
      1. slider 갯수만큼 블릿 생성한다.
      2. slider의 currentIndex 값을 받아온다.
      3. currentIndex 값에 active 클래스 추가한다.
      4. 해당 블릿 클릭 시 currentIndex 로 이동한다.
    */
    const settings = Object.assign({}, paginationDefaults, option); // 옵션 변경을 위한 설정
    const rootElement = $(settings.rootSelector);

    const elements = Object.assign({},{
        bulletItem: rootElement.find(settings.bulletSelector)
    });

    const state = Object.assign({},{
        paginationNumber: settings.bulletBulid,
        activeClass: settings.bulletsActiveClass,
        bulletsCurrentIndex: settings.bulletActiveIndex,
        listItem: settings.item
    });

    Object.assign(this, {
      settings,
      elements,
      state
    });

    // 블릿 : 생성
    if (settings.type === 'bullets') {
      let date = [];
      const rootElement = document.querySelector('.slider-pagination');
      for (let i = 0; i < state.paginationNumber; i++) {
        if (i === 0) {
          date.push(`<span class="pagination-bullet active">${i}</span>`);
        } else {
          date.push(`<span class="pagination-bullet">${i}</span>`);
        }
      }
      rootElement.innerHTML = date.join('');
    }

    // 블릿 : 클릭
    if (settings.clickable) {
      $('.pagination-bullet').on('click', e => {
        const target = $(e.target);
        const index = target.index();
        target.addClass(state.activeClass).siblings().removeClass(state.activeClass);

        this.bulletMotion(index);
      });
    }
  }

  // 설정 : 블릿 (해당 currentIndex에 acitveClass 추가)
  bullets(index) {
    const { paginationNumber, activeClass } = this.state;
    const rootElement = document.querySelector('.slider-pagination');
    const bulletItem = $(rootElement).find('.pagination-bullet');
    this.state.bulletsCurrentIndex = index;

    if (paginationNumber > 0) {
      bulletItem.eq(index).addClass(activeClass).siblings().removeClass(activeClass);
    }
  }

  bulletMotion(index) {
    const { listItem } = this.state;
    this.state.bulletsCurrentIndex = index;

    listItem.eq(index).css('left', 0);
  }
}
