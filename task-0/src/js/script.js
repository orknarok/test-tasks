$(document).ready(function() {
  // slick slider config
  $('.js-slider').slick({
    // add arrow buttons
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev slider__prev">Previous</button>',
    nextArrow: '<button type="button" class="slick-next slider__next">Next</button>',

    // add dots navigation
    dots: true,
    dotsClass: 'slick-dots slider__dots',
  });
});
