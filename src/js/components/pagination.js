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
  clickable: false // 블릿 클릭 가능여부
};

export default class Pagination {
  constructor(option) {
    const settings = Object.assign({}, paginationDefaults, option); // 옵션 변경을 위한 설정
    const rootElement = $(settings.slideRootSelector).find(settings.rootSelector);

    const elements = Object.assign({},{
      rootElement,
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

    // pagination : 생성
    if (settings.type === 'bullets') {
      let date = [];
      for (let i = 0; i < state.paginationNumber; i++) {
        if (i === 0) {
          date.push(`<span class="pagination-bullet active">${i}</span>`);
        } else {
          date.push(`<span class="pagination-bullet">${i}</span>`);
        }
      }
      rootElement.html(date.join(''));
    }

    // pagination : 클릭
    if (settings.clickable) {
      const clicktarget = rootElement.find('.pagination-bullet');
      $(clicktarget).on('click', e => {
        const target = $(e.target);
        const index = target.index();
        target.addClass(state.activeClass).siblings().removeClass(state.activeClass);
        this.bulletMotion(index);

        console.log(target)
      });
    }
  }

  // 설정 : pagination (해당 currentIndex에 acitveClass 추가)
  bullets(index) {
    const { paginationNumber, activeClass } = this.state;
    const bulletItem = this.elements.rootElement.find('.pagination-bullet');
    this.state.bulletsCurrentIndex = index;

    if (paginationNumber > 0) {
      bulletItem.eq(index).addClass(activeClass).siblings().removeClass(activeClass);
    }
  }

  // 설정 : 모션
  bulletMotion(index) {
    this.state.bulletsCurrentIndex = index;

    this.settings.changeSlide(index);
  }
}
