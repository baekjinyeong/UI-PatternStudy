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
  const list = slider.find('.slider-list');
  const item = slider.find('.slider-item');

  const listWidth = parseInt(list.width());
  const itemWidth = parseInt(item.width());

  const prev = slider.find('.slider-button--prev');
  const next = slider.find('.slider-button--next');

  const init = () => {
    item.eq(options.count).addClass('active');

    if (options.pos === 'horizontal') {
      item.css('left', itemWidth);
      item.eq(options.count).css('left', 0);
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

  const rolling = (obj, type, num) => {
    var current = item.eq(options.count);
    item.removeClass('active');

    if (options.animateStatus === true) {
      options.animateStatus = false;

      if (obj === 'next') {
        moveNext(type, current, num);

      } else if (obj === 'prev') {
        movePrev(type, current, num);
      }
    }
  }

  const movePrev = (type, current, num) => {
    console.log(options.count, 'text')
    if(options.count > 0) {
      ;
    }
  };

  const moveNext = (type, current, num) => {
    console.log(options.count);
    if (typeof num === 'number') {
      item.eq(options.count).show();
      item.eq(parseInt(options.count)).css('left', listWidth);

      var count = parseInt(num);
      current.stop().animate({ left: 0 }, options.animateSpeed);
    } else {
      if (current.next().size() > 0) {

      }
    }
  };

  if (options.paging === true) {
    slider.on('click', '.bullet-item', function(e) {
      e.preventDefault();

      const idx = $(this).index();

      if (options.count < idx) {
        rolling('next', options.pos, idx);

      } else if (options.count > idx) {
        rolling('prev', options.pos, idx);
      }
    });
  }
}
slider();
