import $ from 'jquery';

export default function slider() {
  const defaults = {
    count: 0,
    pos: 'horizontal',
    autoplay: false,
    rollingSpeed: 300,
    animateSpeed: 300,
    animateStatus: true,
    interval: false,
    paging: true
  };

  const options = $.extend(defaults, options);
  const slider = $('.slider');
  const item = slider.find('.slider-item');
  const itemWidth = parseInt(item.width());
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
    rolling('prev', 'horizontal');
  });

  next.on('click', e => {
    e.preventDefault();
    rolling('next', 'horizontal');
  });


  const movePrev = (type, current, num) => {
    if (options.count === 0) {
      options.count = 5;
      $('li.slider-item:first-child').animate({ left: '100%' });
    }

    if (0 < options.count) {
      options.count--;

      item
        .eq(parseInt(num))
        .css('left', '-100%')
        .stop()
        .animate({ left: 0 }, options.animateSpeed);

      item
        .eq(num + 1)
        .stop()
        .animate({ left: '100%' }, options.animateSpeed, function() {
          options.animateStatus = true;
        });
    }
  };

  const moveNext = (type, current, num) => {
    if (0 < item.length) {
      options.count++;

      item
        .eq(parseInt(num))
        .css('left', '100%')
        .stop()
        .animate({ left: 0 }, options.animateSpeed);

      item
        .eq(num - 1)
        .stop()
        .animate({ left: '-100%' }, options.animateSpeed, function() {
          options.animateStatus = true;
        });
    }
  };

  const rolling = (direction, type, num) => {
    var current = item.eq(options.count);

    if (options.animateStatus === true) {
      options.animateStatus = false;

      if (direction === 'next') {
        moveNext(type, current, num);
      } else if (direction === 'prev') {
        movePrev(type, current, num);
      }
    }
  };

  // 블릿
  if (options.paging === true) {
    slider.on('click', '.bullet-item', function(e) {
      e.preventDefault;

      const target = $(e.target);
      target
        .addClass('active')
        .siblings()
        .removeClass('active');

      const idx = $(this).index();

      if (options.count < idx) {
        rolling('next', options.pos, idx);
      } else if (options.count > idx) {
        rolling('prev', options.pos, idx);
      }

      console.log(options.count, idx);
    });
  }
}
slider();
