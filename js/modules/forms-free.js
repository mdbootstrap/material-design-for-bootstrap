"use strict";

var _this = void 0;

(function ($) {
  var inputSelector = "".concat(['text', 'password', 'email', 'url', 'tel', 'number', 'search', 'search-md'].map(function (selector) {
    return "input[type=".concat(selector, "]");
  }).join(', '), ", textarea");
  var textAreaSelector = '.materialize-textarea';

  var updateTextFields = function updateTextFields($input) {
    var $labelAndIcon = $input.siblings('label, i');
    var hasValue = $input.val().length;
    var hasPlaceholder = $input.attr('placeholder');
    var addOrRemove = "".concat(hasValue || hasPlaceholder ? 'add' : 'remove', "Class");
    $labelAndIcon[addOrRemove]('active');
  };

  var validateField = function validateField($input) {
    if ($input.hasClass('validate')) {
      var value = $input.val();
      var noValue = !value.length;
      var isValid = !$input[0].validity.badInput;

      if (noValue && isValid) {
        $input.removeClass('valid').removeClass('invalid');
      } else {
        var valid = $input.is(':valid');
        var length = Number($input.attr('length')) || 0;

        if (valid && (!length || length > value.length)) {
          $input.removeClass('invalid').addClass('valid');
        } else {
          $input.removeClass('valid').addClass('invalid');
        }
      }
    }
  };

  var textAreaAutoResize = function textAreaAutoResize() {
    var $textarea = $(_this);

    if ($textarea.val().length) {
      var $hiddenDiv = $('.hiddendiv');
      var fontFamily = $textarea.css('font-family');
      var fontSize = $textarea.css('font-size');

      if (fontSize) {
        $hiddenDiv.css('font-size', fontSize);
      }

      if (fontFamily) {
        $hiddenDiv.css('font-family', fontFamily);
      }

      if ($textarea.attr('wrap') === 'off') {
        $hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
      }

      $hiddenDiv.text("".concat($textarea.val(), "\n"));
      var content = $hiddenDiv.html().replace(/\n/g, '<br>');
      $hiddenDiv.html(content); // When textarea is hidden, width goes crazy.
      // Approximate with half of window size

      $hiddenDiv.css('width', $textarea.is(':visible') ? $textarea.width() : $(window).width() / 2);
      $textarea.css('height', $hiddenDiv.height());
    }
  };

  $(inputSelector).each(function (index, input) {
    var $this = $(input);
    var $labelAndIcon = $this.siblings('label, i');
    updateTextFields($this);
    var isValid = input.validity.badInput;

    if (isValid) {
      $labelAndIcon.addClass('active');
    }
  });
  $(document).on('focus', inputSelector, function (e) {
    $(e.target).siblings('label, i').addClass('active');
  });
  $(document).on('blur', inputSelector, function (e) {
    var $this = $(e.target);
    var noValue = !$this.val();
    var invalid = !e.target.validity.badInput;
    var noPlaceholder = $this.attr('placeholder') === undefined;

    if (noValue && invalid && noPlaceholder) {
      $this.siblings('label, i').removeClass('active');
    }

    validateField($this);
  });
  $(document).on('change', inputSelector, function (e) {
    var $this = $(e.target);
    updateTextFields($this);
    validateField($this);
  });
  $('input[autofocus]').siblings('label, i').addClass('active');
  $(document).on('reset', function (e) {
    var $formReset = $(e.target);

    if ($formReset.is('form')) {
      var $formInputs = $formReset.find(inputSelector);
      $formInputs.removeClass('valid').removeClass('invalid').each(function (index, input) {
        var $this = $(input);
        var noDefaultValue = !$this.val();
        var noPlaceholder = !$this.attr('placeholder');

        if (noDefaultValue && noPlaceholder) {
          $this.siblings('label, i').removeClass('active');
        }
      });
      $formReset.find('select.initialized').each(function (index, select) {
        var $select = $(select);
        var $visibleInput = $select.siblings('input.select-dropdown');
        var defaultValue = $select.children('[selected]').val();
        $select.val(defaultValue);
        $visibleInput.val(defaultValue);
      });
    }
  });

  function init() {
    var $text = $('.md-textarea-auto');

    if ($text.length) {
      var observe;

      if (window.attachEvent) {
        observe = function observe(element, event, handler) {
          element.attachEvent("on".concat(event), handler);
        };
      } else {
        observe = function observe(element, event, handler) {
          element.addEventListener(event, handler, false);
        };
      }

      $text.each(function () {
        var self = this;

        function resize() {
          self.style.height = 'auto';
          self.style.height = "".concat(self.scrollHeight, "px");
        }

        function delayedResize() {
          window.setTimeout(resize, 0);
        }

        observe(self, 'change', resize);
        observe(self, 'cut', delayedResize);
        observe(self, 'paste', delayedResize);
        observe(self, 'drop', delayedResize);
        observe(self, 'keydown', delayedResize);
        resize();
      });
    }
  }

  init();
  var $body = $('body');

  if (!$('.hiddendiv').first().length) {
    var $hiddenDiv = $('<div class="hiddendiv common"></div>');
    $body.append($hiddenDiv);
  }

  $(textAreaSelector).each(textAreaAutoResize);
  $body.on('keyup keydown', textAreaSelector, textAreaAutoResize);
})(jQuery);