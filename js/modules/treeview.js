"use strict";

var toggler = document.getElementsByClassName("rotate");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function () {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("down");
  });
}

(function ($) {
  var $allPanels = $('.treeview-animated .nested').hide();
  var $elements = $('.treeview-animated-element');
  $('.closed').click(function () {
    $this = $(this);
    $target = $this.siblings('.treeview-animated .nested');
    $pointer = $this.children('.treeview-animated .fa-angle-right');
    $this.toggleClass('open');
    $pointer.toggleClass('down');
    !$target.hasClass('active') ? $target.addClass('active').slideDown() : $target.removeClass('active').slideUp();
    return false;
  });
  $elements.click(function () {
    $this = $(this);
    $this.hasClass('opened') ? $this.removeClass('opened') : ($elements.removeClass('opened'), $this.addClass('opened'));
  });
})(jQuery);