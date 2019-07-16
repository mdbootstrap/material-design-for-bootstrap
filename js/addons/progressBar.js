(function ($) {
  $.fn.progressBar = function (givenValue) {
    const $this = $(this);

    function init(selector) {
      const progressValue = selector.children().attr('aria-valuenow');
      selector.children().width(`${progressValue}%`);
      selector.children().html('<span></span>');
      $this.hasClass('md-progress') ? selector.children().children().addClass('md-progress-bar-text') : selector.children().children().addClass('progress-bar-text');
      (progressValue !== 100) ? selector.children().children().text(`${progressValue}%`) : selector.children().children().html('<i class="fas fa-check"></i>');
    }

    function set(selector, value) {
      selector.children().removeClass('success fail active');
      selector.children().attr('aria-valuenow', value);
      init(selector);
      if (value > 100) {
        return false;
      } else if (value === 100) {
        selector.children().addClass('success');
      } else if (value < 30) {
        selector.children().addClass('fail');
      } else {
        selector.children().addClass('active');
      }
      return true;
    }

    set($this, givenValue);
  };
}(jQuery));
