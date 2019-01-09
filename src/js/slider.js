(function () {
  'use strict';
  console.log('test');

  /*
    슬라이드 갯수에 맞게 자동 넓이 설정
    좌, 우 버튼 클릭 시 슬라이드 이동
  */

  const slider = $('.slider');
  const sliderList = slider.find('.slider-list')
  const sliderItem = slider.find('.slider-item');
  const sliderItemWidth = sliderItem.width();
  const slideItemWidth = sliderItem.length * sliderItemWidth;
  const innerBLock = $('.slider-inner-block').width();
  let count = 0;

  // 클릭 이벤트
  const btnClick = () => {
    const buttonPrev = $('.slider-button--prev');
    const buttonNext = $('.slider-button--next');

    buttonPrev.on('click', () => {
      count--;
      movePrev();
    })

    buttonNext.on('click', () => {
      count++;
      moveNext();
      console.log(count);
    })
  }

  // 이전
  const movePrev = () => {
    if(count >= 0) {
      sliderList.animate(
        {
        'margin-left' : (sliderItemWidth * count) + 20 + 'px'
        },
        300
      );
    } else {
      count = 0;
    }
  }

  // 다음
  const moveNext = () => {
    if(innerBLock < slideItemWidth) {
      sliderList.animate(
        {
          'margin-left' : (-sliderItemWidth * count) - 20 + 'px'
        },
        300
      );
    }
  }

  // 슬라이드 이동
  const move = () => {
    btnClick();
  }

move();

})();