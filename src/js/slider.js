import $ from 'jquery';

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

class Slider {
  constructor(option) {
    this.options = $.extend({}, defaults, option);
    console.log(this);
  }
}

const slider1 = new Slider({rootElement: 'slider1'});
