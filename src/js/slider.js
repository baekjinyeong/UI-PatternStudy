import $ from 'jquery';

export default function slider() {
  const defaults = {
    count: 0,
    pos: 'horizontal',
    autoplay: false,
    rollingSpeed: 300,
    animateSpeed: 300,
    interval: false,
    paging: true
  };

  const options = $.extend(defaults, options);
  const slider = $('.slider');
  const item = slider.find('.slider-item');
  const prev = slider.find('.slider-button--prev');
  const next = slider.find('.slider-button--next');
  const bullet = $('.bullet-item');

  // 초기세팅
  const init = () => {
    if (options.pos === 'horizontal') {
      item.css('left', '100%');
      item.eq(options.count).css('left', 0);
      bullet.eq(options.count).addClass('active');
    }
  };
  init();

  prev.on('click', e => {
    e.preventDefault();
    rolling('prev', options.count);
    options.count--;
  });

  next.on('click', e => {
    e.preventDefault();
    rolling('next', options.count);
  });

  const movePrev = number => {
    options.count = number;

    if (0 <= number) {
      item
        .eq(parseInt(number))
        .css('left', '-100%')
        .stop()
        .animate({ left: 0 }, options.animateSpeed);

      item
        .eq(number + 1)
        .stop()
        .animate({ left: '100%' }, options.animateSpeed);
    }
  };

  const moveNext = number => {
    options.count = number;

    if (0 < item.length) {
      item
        .eq(parseInt(number))
        .css('left', '100%')
        .stop()
        .animate({ left: 0 }, options.animateSpeed);

      item
        .eq(parseInt(number - 1))
        .stop()
        .animate({ left: '-100%' }, options.animateSpeed);

      if (number === item.length) {
        options.count = 0;
      }
    }
  };

  const rolling = (direction, num) => {
    if (direction === 'next') {
      moveNext(num);
    } else if (direction === 'prev') {
      movePrev(num);
    }
  };

  // 블릿 사용할 경우
  if (options.paging === true) {
    slider.on('click', '.bullet-item', function(e) {
      e.preventDefault;

      const target = $(e.target);
      const idx = target.index();

      target
        .addClass('active')
        .siblings()
        .removeClass('active');

      if (options.count < idx) {
        rolling('next', idx);
        item
          .eq(idx)
          .nextAll()
          .css('left', '100%');
        item
          .eq(idx)
          .prevAll()
          .css('left', '-100%');
      } else if (options.count > idx) {
        rolling('prev', idx);
        item
          .eq(idx)
          .nextAll()
          .css('left', '100%');
        item
          .eq(idx)
          .prevAll()
          .css('left', '-100%');
      }
    });
  } else {
    options.paging = false;
  }
}
slider();
