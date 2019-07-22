"use strict";

(function ($) {
  $.fn.mdbTreeview = function () {
    var $this = $(this);

    if ($this.hasClass('treeview')) {
      var $toggler = $this.find('.rotate');
      $.each($toggler, function (e) {
        $($toggler[e]).off('click');
        $($toggler[e]).on('click', function () {
          var $this = $(this);
          $this.siblings('.nested').toggleClass('active');
          $this.toggleClass('down');
        });
      });
    }

    if ($this.hasClass('treeview-animated')) {
      var $elements = $this.find('.treeview-animated-element');
      var $closed = $this.find('.closed');
      $this.find('.nested').hide();
      $closed.off('click');
      $closed.on('click', function () {
        var $this = $(this);
        var $target = $this.siblings('.nested');
        var $pointer = $this.children('.fa-angle-right');
        $this.toggleClass('open');
        $pointer.toggleClass('down');
        !$target.hasClass('active') ? $target.addClass('active').slideDown() : $target.removeClass('active').slideUp();
        return false;
      });
      $elements.off('click');
      $elements.on('click', function () {
        var $this = $(this);
        $this.hasClass('opened') ? $this.removeClass('opened') : ($elements.removeClass('opened'), $this.addClass('opened'));
      });
    }

    if ($this.hasClass('treeview-colorful')) {
      var _$elements = $this.find('.treeview-colorful-element');

      var $header = $this.find('.treeview-colorful-items-header');
      $this.find('.nested').hide();
      $header.off('click');
      $header.on('click', function () {
        var $this = $(this);
        var $target = $this.siblings('.nested');
        var $pointerPlus = $this.children('.fa-plus-circle');
        var $pointerMinus = $this.children('.fa-minus-circle');
        $this.toggleClass('open');
        $pointerPlus.removeClass('fa-plus-circle');
        $pointerPlus.addClass('fa-minus-circle');
        $pointerMinus.removeClass('fa-minus-circle');
        $pointerMinus.addClass('fa-plus-circle');
        !$target.hasClass('active') ? $target.addClass('active').slideDown() : $target.removeClass('active').slideUp();
      });

      _$elements.off('click');

      _$elements.on('click', function () {
        var $this = $(this);
        $this.hasClass('opened') ? _$elements.removeClass('opened') : (_$elements.removeClass('opened'), $this.addClass('opened'));
      });
    }
  };
})(jQuery);