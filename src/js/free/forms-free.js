jQuery(($) => {

  class Forms {

    constructor() {
      this.inputSelector = `${['text', 'password', 'email', 'url', 'tel', 'number', 'search', 'search-md', 'date']
        .map((selector) => `input[type=${selector}]`)
        .join(', ')}, textarea`;
      this.textAreaSelector = '.materialize-textarea';
      this.$text = $('.md-textarea-auto');
      this.$body = $('body');
      this.$document = $(document);
    }

    init() {

      if (this.$text.length) {
        let observe;

        if (window.attachEvent) {
          observe = function (element, event, handler) {
            element.attachEvent(`on${event}`, handler);
          };
        } else {
          observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
          };
        }

        this.$text.each(function () {
          const self = this;

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

      $(this.inputSelector).each((index, input) => {
        const $this = $(input);
        const isNotValid = input.validity.badInput;
        this.updateTextFields($this);

        if (isNotValid) {
          this.toggleActiveClass($this, 'add');
        }
      });

      this.addOnFocusEvent();
      this.addOnBlurEvent();
      this.addOnChangeEvent();
      this.addOnResetEvent();
      this.appendHiddenDiv();
      this.makeActiveAutofocus();

      $(this.textAreaSelector).each(this.textAreaAutoResize);
      this.$body.on('keyup keydown', this.textAreaSelector, this.textAreaAutoResize);
    }

    makeActiveAutofocus() {

      this.toggleActiveClass($('input[autofocus]'), 'add');
    }

    toggleActiveClass($this, action) {
      let selectors;
      action = `${action}Class`;

      if ($this.parent().hasClass('timepicker')) {
        selectors = 'label';
      } else {
        selectors = 'label, i, .input-prefix';
      }
      $this.siblings(selectors)[action]('active');
    }

    addOnFocusEvent() {
      this.$document.on('focus', this.inputSelector, (e) => {
        this.toggleActiveClass($(e.target), 'add');

        if($(e.target).attr("type") == "date") {
          $(e.target).css("color", "#495057");
        }
      });
    }

    addOnBlurEvent() {
      this.$document.on('blur', this.inputSelector, (e) => {
        const $this = $(e.target);
        const noValue = !$this.val();
        const isValid = !e.target.validity.badInput;
        const noPlaceholder = $this.attr('placeholder') === undefined;

        if (noValue && isValid && noPlaceholder) {
          this.toggleActiveClass($this, 'remove');
          if($this.attr("type") == "date") {
            $this.css("color", "transparent");
          }
        }

        if (!noValue && isValid && noPlaceholder) {
          $this.siblings('i, .input-prefix').removeClass('active');

          if($this.attr("type") == "date") {
            $this.css("color", "#495057");
          }
        }

        this.validateField($this);
      });
    }

    addOnChangeEvent() {
      this.$document.on('change', this.inputSelector, (e) => {
        const $this = $(e.target);

        this.updateTextFields($this);
        this.validateField($this);
      });
    }

    addOnResetEvent() {
      this.$document.on('reset', (e) => {
        const $formReset = $(e.target);

        if ($formReset.is('form')) {
          const $formInputs = $formReset.find(this.inputSelector);

          $formInputs
            .removeClass('valid invalid')
            .each((index, input) => {
              const $this = $(input);
              const noDefaultValue = !$this.val();
              const noPlaceholder = !$this.attr('placeholder');

              if (noDefaultValue && noPlaceholder) {
                this.toggleActiveClass($this, 'remove');
              }
            });

          $formReset.find('select.initialized').each((index, select) => {
            const $select = $(select);
            const $visibleInput = $select.siblings('input.select-dropdown');
            const defaultValue = $select.children('[selected]').val();

            $select.val(defaultValue);
            $visibleInput.val(defaultValue);
          });
        }
      });
    }

    appendHiddenDiv() {
      if (!$('.hiddendiv').first().length) {
        const $hiddenDiv = $('<div class="hiddendiv common"></div>');
        this.$body.append($hiddenDiv);
      }
    }

    updateTextFields($input) {
      const hasValue = Boolean($input.val());
      const hasPlaceholder = Boolean($input.attr('placeholder'));
      const addOrRemove = hasValue || hasPlaceholder ? 'add' : 'remove';
      const hasActiveLabel = $input.siblings('label').hasClass('active');
      const hasLabel = Boolean($input.siblings('label')[0])

      if($input.attr("type") !== "date") {
        this.toggleActiveClass($input, addOrRemove);
      }

      if($input.attr("type") == "date" && !hasActiveLabel && hasLabel) {
        $input.css("color", "transparent");

      } else if($input.attr("type") == "date" && hasValue) {
        this.toggleActiveClass($input, addOrRemove);
      }
    }

    validateField($input) {
      if ($input.hasClass('validate')) {
        const value = $input.val();
        const noValue = !value.length;
        const isValid = !$input[0].validity.badInput;

        if (noValue && isValid) {
          $input.removeClass('valid').removeClass('invalid');
        } else {
          const valid = $input[0].validity.valid;
          const length = Number($input.attr('length')) || 0;

          if (valid && (!length || length > value.length)) {
            $input.removeClass('invalid').addClass('valid');
          } else {
            $input.removeClass('valid').addClass('invalid');
          }
        }
      }
    }

    textAreaAutoResize() {
      const $textarea = $(this);

      if ($textarea.val().length) {
        const $hiddenDiv = $('.hiddendiv');
        const fontFamily = $textarea.css('font-family');
        const fontSize = $textarea.css('font-size');

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
        const content = $hiddenDiv.html().replace(/\n/g, '<br>');
        $hiddenDiv.html(content);

        // When textarea is hidden, width goes crazy.
        // Approximate with half of window size
        $hiddenDiv.css('width', $textarea.is(':visible') ? $textarea.width() : $(window).width() / 2);
        $textarea.css('height', $hiddenDiv.height());
      }
    }
  }

  //auto init Forms
  const forms = new Forms();
  forms.init();

});
