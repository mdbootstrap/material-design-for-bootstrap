'use strict';

(function ($) {
  $('.input-default-wrapper').on('change', '.input-default-js', function (e) {

    var $this = $(e.target),
        $label = $this.next('label'),
        $files = $this[0].files;
    var fileName = '';

    if ($files && $files.length > 1) {
      fileName = ($this.attr('data-multiple-target') || '').replace('{target}', $files.length);
    } else if (e.target.value) {
      fileName = e.target.value.split('\\').pop();
    }
    fileName ? $label.find('.span-choose-file').html(fileName) : $label.html($label.html());
  });
})(jQuery);