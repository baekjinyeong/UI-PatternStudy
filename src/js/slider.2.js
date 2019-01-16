import $ from 'jquery';

export default function slider() {
  var win = $(window);
  var interval;
  const slider = $('.slider');
  const sliderList = slider.find('.slider-list');
  const sliderItem = slider.find('.slider-item');
  const itemWidth = sliderItem.width();
  const itemLength = sliderItem.length;
  const buttonPrev = $('.slider-button--prev');
  const buttonNext = $('.slider-button--next');
  const bulletList = $('.slider-button-bullet');
  const buttonBullet = bulletList.find('.bullet-item');
  const buttonAutoPlay = $('.button-start');
  const buttonAutoStop = $('.button-stop');
  let count = 0;

  $.fn.load = function(callback){ $(window).on("load", callback) };

  sliderList.css('width', itemWidth * itemLength);
  sliderItem.css('left', '100%');
  $('li.slider-item:first-child').css('left', 0);

  // 새로고침 시 auto slide
  win.load(() => {
    // startPlay();
  });

  // 이전버튼
  buttonPrev.on('click', () => {
    movePrev();
  });

  // 다음버튼
  buttonNext.on('click', () => {
    moveNext();
  });

  // 블릿
  buttonBullet.on('click', e => {
    e.preventDefault();
    const target = $(e.target);
    target
      .addClass('active')
      .siblings()
      .removeClass('active');

    count = target.index();

    
    console.log(count);
  });

  // 재생버튼
  buttonAutoPlay.on('click', () => {
    startPlay();
    buttonAutoPlay
      .addClass('is-active')
      .siblings()
      .removeClass('is-active');
  });

  // 멈춤버튼
  buttonAutoStop.on('click', () => {
    stopPlay();
    buttonAutoStop
      .addClass('is-active')
      .siblings()
      .removeClass('is-active');
  });

  // 이전
  const movePrev = () => {
    count = $('.slider-item')
      .eq(count)
      .index();

    if (count === 0) {
      count = 5;
      $('li.slider-item:first-child').animate({ left: '100%' });
    }

    if (0 < count) {
      count--;
      bulletCurrent();
      console.log(count);

      var _this = $('.slider-item');

      _this
        .eq(count)
        .css('left', '-100%')
        .stop()
        .animate({ left: 0 }, 300);
      _this
        .eq(count + 1)
        .stop()
        .animate({ left: '100%' }, 300);
    }
  };

  // 다음
  const moveNext = () => {
    if (0 < itemLength) {
      count++;
      console.log(count);
      bulletCurrent();

      var _this = $('.slider-item');

      _this
        .eq(count)
        .css('left', '100%')
        .stop()
        .animate({ left: 0 }, 300);
      _this
        .eq(count - 1)
        .stop()
        .animate({ left: '-100%' }, 300);

      if (count === itemLength - 1) {
        count = -1;
      }
    }
  };

  // 블릿
  const bulletCurrent = () => {
    buttonBullet
      .eq(count)
      .addClass('active')
      .siblings()
      .removeClass('active');
  };

  // 자동재생
  const startPlay = () => {
    interval = setInterval(() => {
      moveNext();
    }, 3000);
  };

  // 자동재생멈춤
  const stopPlay = () => {
    clearInterval(interval);
  };
}
slider();
