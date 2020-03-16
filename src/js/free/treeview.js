jQuery(($) => {
  $.fn.mdbTreeview = function () {

    const $this = $(this);

    if ($this.hasClass('treeview')) {
      treeviewToggle($this);
    }

    if ($this.hasClass('treeview-animated')) {
      treeviewAnimated($this);
    }

    if ($this.hasClass('treeview-colorful')) {
      treeviewColorful($this);
    }
  };

  function treeviewToggle($this) {
    const $toggler = $this.find('.rotate');

    $toggler.each(function () {
      const $this = $(this);

      $this.off('click');
      $this.on('click', function () {
        const $this = $(this);

        $this.siblings('.nested').toggleClass('active');
        $this.toggleClass('down');
      });
    });
  }

  function treeviewAnimated($this) {
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

      if (!$target.hasClass('active')) {
        $target.addClass('active').slideDown();
      } else {
        $target.removeClass('active').slideUp();
      }
    });

    $elements.off('click');
    $elements.on('click', function () {
      const $this = $(this);

      if ($this.hasClass('opened')) {
        $this.removeClass('opened');
      } else {
        $elements.removeClass('opened');
        $this.addClass('opened');
      }
    });
  }

  function treeviewColorful($this) {
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

      if (!$target.hasClass('active')) {
        $target.addClass('active').slideDown();
      } else {
        $target.removeClass('active').slideUp();
      }
    });

    $elements.off('click');
    $elements.on('click', function () {
      const $this = $(this);

      if ($this.hasClass('opened')) {
        $elements.removeClass('opened');
      } else {
        $elements.removeClass('opened');
        $this.addClass('opened');
      }
    });
  }
});
