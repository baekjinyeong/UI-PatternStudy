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

  // 새로고침 시 auto slide
  win.load(() => {
    startPlay();
  });

  // 다음버튼
  buttonPrev.on('click', () => {
    movePrev();
    bulletCurrent();
  });

  // 이전버튼
  buttonNext.on('click', () => {
    moveNext();
  });

  // 블릿
  buttonBullet.on('click', e => {
    e.preventDefault();
    const target = $(e.target);

    count = target.index();
    target
      .addClass('active')
      .siblings()
      .removeClass('active');

    sliderList.stop().animate(
      {
        left: count * -itemWidth
      },
      300
    );
    console.log(count);
  });

  // 재생버튼
  buttonAutoPlay.on('click', () => {
    startPlay();
    buttonAutoPlay
      .addClass('is-active')
      .siblings()
      .removeClass('is-active');

    console.log(count, 'start');
  });

  // 멈춤버튼
  buttonAutoStop.on('click', () => {
    stopPlay();
    buttonAutoStop
      .addClass('is-active')
      .siblings()
      .removeClass('is-active');
    console.log(count, 'stop');
  });

  // 이전
  const movePrev = () => {
    count--;
    console.log(count);
  };

  // 다음
  const moveNext = () => {
    console.log(count);
    if (count >= 0) {
      count++;
      sliderList.stop().animate(
        {
          left: '+=' + -itemWidth
        },
        300,
        () => {
          if (count >= 0) {
            sliderList
              .children('li.slider-item:first-child')
              .appendTo(sliderList);
            sliderList.css('left', 0);
          }
        }
      );
    }
    if (count > 4) {
      count = 0;
    }
    bulletCurrent();
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
