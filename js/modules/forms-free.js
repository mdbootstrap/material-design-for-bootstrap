"use strict";

var _this = void 0;

(function ($) {
  let inputSelector = `${['text', 'password', 'email', 'url', 'tel', 'number', 'search', 'search-md'].map(function (selector) {
    return `input[type=${selector}]`;
  }).join(', ')}, textarea`;
  let textAreaSelector = '.materialize-textarea';

  let updateTextFields = function updateTextFields($input) {
    let $labelAndIcon = $input.siblings('label, i');
    let hasValue = $input.val().length;
    let hasPlaceholder = $input.attr('placeholder');
    let addOrRemove = `${hasValue || hasPlaceholder ? 'add' : 'remove'}Class`;
    $labelAndIcon[addOrRemove]('active');
  };

  let validateField = function validateField($input) {
    if ($input.hasClass('validate')) {
      let value = $input.val();
      let noValue = !value.length;
      let isValid = !$input[0].validity.badInput;

      if (noValue && isValid) {
        $input.removeClass('valid').removeClass('invalid');
      } else {
        let valid = $input.is(':valid');
        let length = Number($input.attr('length')) || 0;

        if (valid && (!length || length > value.length)) {
          $input.removeClass('invalid').addClass('valid');
        } else {
          $input.removeClass('valid').addClass('invalid');
        }
      }
    }
  };

  let textAreaAutoResize = function textAreaAutoResize() {
    let $textarea = $(_this);

    if ($textarea.val().length) {
      let $hiddenDiv = $('.hiddendiv');
      let fontFamily = $textarea.css('font-family');
      let fontSize = $textarea.css('font-size');

      if (fontSize) {
        $hiddenDiv.css('font-size', fontSize);
      }

      if (fontFamily) {
        $hiddenDiv.css('font-family', fontFamily);
      }

      if ($textarea.attr('wrap') === 'off') {
        $hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
      }

      $hiddenDiv.text(`${$textarea.val()}\n`);
      let content = $hiddenDiv.html().replace(/\n/g, '<br>');
      $hiddenDiv.html(content); // When textarea is hidden, width goes crazy.
      // Approximate with half of window size

      $hiddenDiv.css('width', $textarea.is(':visible') ? $textarea.width() : $(window).width() / 2);
      $textarea.css('height', $hiddenDiv.height());
    }
  };

  $(inputSelector).each(function (index, input) {
    let $this = $(input);
    let $labelAndIcon = $this.siblings('label, i');
    updateTextFields($this);
    let isValid = input.validity.badInput;

    if (isValid) {
      $labelAndIcon.addClass('active');
    }
  });
  $(document).on('focus', inputSelector, function (e) {
    $(e.target).siblings('label, i').addClass('active');
  });
  $(document).on('blur', inputSelector, function (e) {
    let $this = $(e.target);
    let noValue = !$this.val();
    let invalid = !e.target.validity.badInput;
    let noPlaceholder = $this.attr('placeholder') === undefined;

    if (noValue && invalid && noPlaceholder) {
      $this.siblings('label, i').removeClass('active');
    }

    validateField($this);
  });
  $(document).on('change', inputSelector, function (e) {
    let $this = $(e.target);
    updateTextFields($this);
    validateField($this);
  });
  $('input[autofocus]').siblings('label, i').addClass('active');
  $(document).on('reset', function (e) {
    let $formReset = $(e.target);

    if ($formReset.is('form')) {
      let $formInputs = $formReset.find(inputSelector);
      $formInputs.removeClass('valid').removeClass('invalid').each(function (index, input) {
        let $this = $(input);
        let noDefaultValue = !$this.val();
        let noPlaceholder = !$this.attr('placeholder');

        if (noDefaultValue && noPlaceholder) {
          $this.siblings('label, i').removeClass('active');
        }
      });
      $formReset.find('select.initialized').each(function (index, select) {
        let $select = $(select);
        let $visibleInput = $select.siblings('input.select-dropdown');
        let defaultValue = $select.children('[selected]').val();
        $select.val(defaultValue);
        $visibleInput.val(defaultValue);
      });
    }
  });

  function init() {
    let $text = $('.md-textarea-auto');

    if ($text.length) {
      let observe;

      if (window.attachEvent) {
        observe = function observe(element, event, handler) {
          element.attachEvent(`on${event}`, handler);
        };
      } else {
        observe = function observe(element, event, handler) {
          element.addEventListener(event, handler, false);
        };
      }

      $text.each(function () {
        let self = this;

        function resize() {
          self.style.height = 'auto';
          self.style.height = `${self.scrollHeight}px`;
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
  let $body = $('body');

  if (!$('.hiddendiv').first().length) {
    let $hiddenDiv = $('<div class="hiddendiv common"></div>');
    $body.append($hiddenDiv);
  }

  $(textAreaSelector).each(textAreaAutoResize);
  $body.on('keyup keydown', textAreaSelector, textAreaAutoResize);
})(jQuery);