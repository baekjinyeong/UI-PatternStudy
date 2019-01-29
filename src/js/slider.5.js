import $ from 'jquery';

export default function slider(option) {
  const defaults = {
    rootElement: '.slider',
    count: 0,
    pos: 'horizontal',
    autoplay: false,
    rollingSpeed: 300,
    animateSpeed: 300,
    interval: false,
    paging: true
  };

  const options = $.extend({}, defaults, option);

  const slider = $(options.rootElement);
  const item = slider.find('.slider-item');
  const prev = slider.find('.slider-button--prev');
  const next = slider.find('.slider-button--next');
  const bullet = slider.find('.bullet-item');

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
    options.count--;
    rolling('prev', options.count);
    bulletActive();
  });

  next.on('click', e => {
    e.preventDefault();
    options.count++;
    rolling('next', options.count);
    bulletActive();
  });

  const movePrev = number => {
    if (0 > number) {
      number = item.length - 1;
      options.count = number;

      item
        .eq(parseInt(number))
        .css('left', '-100%')
        .stop()
        .animate({ left: 0 }, options.animateSpeed);

      $('li.slider-item:first-child').animate({ left: '100%' });
    }

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
        number = 0;
        options.count = number;
        item
          .eq(parseInt(number))
          .css('left', '100%')
          .stop()
          .animate({ left: 0 }, options.animateSpeed);
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
  }

  // 블릿 활성화
  const bulletActive = () => {
    $('.bullet-item')
      .eq(options.count)
      .addClass('active')
      .siblings()
      .removeClass('active');
  };
}
slider();
