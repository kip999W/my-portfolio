const swiperText = new Swiper('.swiper', {
  speed: 2500,
  loop: true,
  allowTouchMove: false,
  autoplay: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next'
  }
});