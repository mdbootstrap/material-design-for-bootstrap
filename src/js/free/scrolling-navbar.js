jQuery(function ($) {

  const SCROLLING_NAVBAR_OFFSET_TOP = 50;

  $(window).on('scroll', () => {

    const $navbar = $('.navbar');
    
    if (!$navbar.length) return;

    $('.scrolling-navbar')[$navbar.offset().top > SCROLLING_NAVBAR_OFFSET_TOP ? 'addClass' : 'removeClass']('top-nav-collapse');
  });
});
