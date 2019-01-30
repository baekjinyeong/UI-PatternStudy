import $ from 'jquery';

const defaults = {
  rootSelector: '.slider',
  activeClass: '.active',
  currentItem: '.slider-item',
  prevButtonSelector: '.slider-button--prev',
  nextButtonSelector: '.slider-button--next',
  paginationSelector: '.bullet-item',
  direction: 'horizontal',
  autoplay: false,
  rollingSpeed: 300,
  animateSpeed: 300,
  interval: false,
  pagination: true,
  currentIndex: 0
};

class Slider {
  constructor(option) {
    const settings = $.extend({}, defaults, option);
    const rootElement = $(settings.rootSelector);
    const prevButtonElement = rootElement.find(settings.prevButtonSelector);
    const nextButtonElement = rootElement.find(settings.nextButtonSelector);
    const bulletButtonElement = rootElement.find(settings.paginationSelector);

    this.activeIndex = settings.currentIndex;
    this.currentItem = settings.currentItem;
    this.settings = settings;

    if (settings.direction === 'horizontal') {
      this.currentItem.css('left', '100%');
      this.currentItem.eq(this.activeIndex).css('left', 0);
      bulletButtonElement.eq(this.activeIndex).addClass('active');
    }

    prevButtonElement.on('click', () => {
      this.prev();
    });

    nextButtonElement.on('click', () => {
      this.next();
    });

    bulletButtonElement.on('click', e => {
      this.slideTo($(e.target).index());
    });
  }

  prev() {
    this.motion(this.activeIndex - 1);
    this.activeIndex--;
  }

  next() {
    this.motion(this.activeIndex + 1);
    this.activeIndex++;
  }

  motion(newIdx) {
    // if (this.activeIndex < newIdx) {
    //   this.item
    //     .eq(newIdx)
    //     .css('left', '100%')
    //     .stop()
    //     .animate({ left: 0 }, this.animateSpeed);

    //   this.item
    //     .eq(this.activeIndex)
    //     .stop()
    //     .animate({ left: '-100%' }, this.animateSpeed);

    //   if (newIdx === this.item.length) {
    //     this.activeIndex = -1;
    //     newIdx = 0;

    //     this.item
    //       .eq(newIdx)
    //       .css('left', '100%')
    //       .stop()
    //       .animate({ left: 0 }, this.animateSpeed);
    //   }
    // } else if (this.activeIndex > newIdx) {
    //   this.item
    //     .eq(newIdx)
    //     .css('left', '-100%')
    //     .stop()
    //     .animate({ left: 0 }, this.animateSpeed);

    //   this.item
    //     .eq(this.activeIndex)
    //     .stop()
    //     .animate({ left: '100%' }, this.animateSpeed);

    //   if (newIdx < -this.item.length) {
    //     this.activeIndex = 0;
    //     newIdx = -1;

    //     this.item
    //       .eq(newIdx)
    //       .css('left', '-100%')
    //       .stop()
    //       .animate({ left: 0 }, this.animateSpeed);
    //   }
    // }
    console.log(this.activeIndex, newIdx);
  }

  slideTo(idx) {
    this.motion(idx);
  }
}

const slider1 = new Slider();
