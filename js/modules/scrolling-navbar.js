($ => {

  const SCROLLING_NAVBAR_OFFSET_TOP = 50;

  $(window).on('scroll', () => {

    const $navbar = $('.navbar');
    if ($navbar.length) {

      if ($navbar.offset().top > SCROLLING_NAVBAR_OFFSET_TOP) {

        $('.scrolling-navbar').addClass('top-nav-collapse');
      } else {

        $('.scrolling-navbar').removeClass('top-nav-collapse');
      }
    }
  });
})(jQuery);