import $ from 'jquery';

// ================================== pagination ==================================
// pagination 옵션 값
const defaults = {
  type: 'bullets',
  rootSelectorClass: 'slider-pagination',
  bulletSelectorClass: 'pagination-bullet',
  bulletsActiveClass: 'active',
  bulletsLength: 0,
  bulletActiveIndex: 0,
  clickable: false // 블릿 클릭 가능여부
};

export default class Pagination {
  constructor(option) {
    const settings = Object.assign({}, defaults, option); // 옵션 변경을 위한 설정
    const rootElement = $(settings.slideRootSelector).find(`.${settings.rootSelectorClass}`);

    const elements = Object.assign({},{
        rootElement,
        bulletItem: rootElement.find(`.${settings.bulletSelectorClass}`)
    });

    const state = Object.assign({},{
        paginationNumber: settings.bulletsLength,
        activeClass: settings.bulletsActiveClass,
        bulletsCurrentIndex: settings.bulletActiveIndex
    });

    Object.assign(this, {
      settings,
      elements,
      state
    });

    // pagination : 생성
    if (settings.type === 'bullets') {
      let paginetionData = [];
      for (let i = 0; i < state.paginationNumber; i++) {
        if (i === 0) {
          paginetionData.push(`<span class="pagination-bullet active">${i}</span>`);
        } else {
          paginetionData.push(`<span class="pagination-bullet">${i}</span>`);
        }
      }
      rootElement.html(paginetionData.join(''));
    }

    // pagination : 클릭
    if (settings.clickable) {
      $(rootElement).on('click', e => {
        const target = $(e.target);
        const index = target.index();

        target.addClass(state.activeClass).siblings().removeClass(state.activeClass);
        this.bulletMotion(index);
      });
    }
  }

  // 설정 : pagination (해당 currentIndex에 acitveClass 추가)
  bullets(index) {
    const { bulletSelectorClass } = this.settings;
    const { paginationNumber, activeClass } = this.state;
    const { rootElement } = this.elements;
    const bulletItem = rootElement.find(`.${bulletSelectorClass}`);

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
