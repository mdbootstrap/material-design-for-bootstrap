(function ($) {
  $.fn.mdbTreeview = function () {

    const $this = $(this);

    if ($this.hasClass('treeview')) {
      const $toggler = $this.find('.rotate');
      $.each($toggler, (e) => {
        $($toggler[e]).off('click');
        $($toggler[e]).on('click', function () {
          const $this = $(this);
          $this.siblings('.nested').toggleClass('active');
          $this.toggleClass('down');
        });
      });
    }

    if ($this.hasClass('treeview-animated')) {
      const $elements = $this.find('.treeview-animated-element');
      const $closed = $this.find('.closed');

      $this.find('.nested').hide();

      $closed.off('click');
      $closed.on('click', function () {
        const $this = $(this);
        const $target = $this.siblings('.nested');
        const $pointer = $this.children('.fa-angle-right');

        $this.toggleClass('open');
        $pointer.toggleClass('down');
        !$target.hasClass('active') ? $target.addClass('active').slideDown() : $target.removeClass('active').slideUp();
        return false;
      });

      $elements.off('click');
      $elements.on('click', function () {
        const $this = $(this);
        $this.hasClass('opened') ? $this.removeClass('opened') : ($elements.removeClass('opened'), $this.addClass('opened'));
      });
    }

    if ($this.hasClass('treeview-colorful')) {
      const $elements = $this.find('.treeview-colorful-element');
      const $header = $this.find('.treeview-colorful-items-header');

      $this.find('.nested').hide();

      $header.off('click');
      $header.on('click', function () {
        const $this = $(this);
        const $target = $this.siblings('.nested');
        const $pointerPlus = $this.children('.fa-plus-circle');
        const $pointerMinus = $this.children('.fa-minus-circle');

        $this.toggleClass('open');
        $pointerPlus.removeClass('fa-plus-circle');
        $pointerPlus.addClass('fa-minus-circle');
        $pointerMinus.removeClass('fa-minus-circle');
        $pointerMinus.addClass('fa-plus-circle');

        !$target.hasClass('active') ? $target.addClass('active').slideDown() : $target.removeClass('active').slideUp();
      });

      $elements.off('click');
      $elements.on('click', function () {
        const $this = $(this);
        $this.hasClass('opened') ? $elements.removeClass('opened') : ($elements.removeClass('opened'), $this.addClass('opened'));
      });

    }
  };
}(jQuery));
