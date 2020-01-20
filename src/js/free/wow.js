jQuery($ => {

  class WOW {
    init() {
      $('.wow').wow();
    }
  }

  class MDBWow {
    constructor($wowElement, customization) {
      this.$wowElement = $wowElement;
      this.customization = customization;
      this.animated = true;
      this.options = this.assignElementCustomization();
    }

    init() {
      $(window).scroll(() => {
        if (this.animated) {
          this.hide();
        } else {
          this.mdbWow();
        }
      });

      this.appear();
    }

    assignElementCustomization() {
      return {
        animationName: this.$wowElement.css('animation-name'),
        offset: 100,
        iteration: this.fallback()
          .or(this.$wowElement.data('wow-iteration'))
          .or(1)
          .value(),
        duration: this.fallback()
          .or(this.$wowElement.data('wow-duration'))
          .or(1000)
          .value(),
        delay: this.fallback()
          .or(this.$wowElement.data('wow-delay'))
          .or(0)
          .value()
      };
    }

    mdbWow() {
      if (this.$wowElement.css('visibility') === 'visible') {
        return;
      }

      if (this.shouldElementBeVisible(true)) {
        setTimeout(() => this.$wowElement.removeClass('animated'), this.countRemoveTime());
        this.appear();
      }
    }

    appear() {
      this.$wowElement.addClass('animated');
      this.$wowElement.css({
        visibility: 'visible',
        'animation-name': this.options.animationName,
        'animation-iteration-count': this.options.iteration,
        'animation-duration': this.options.duration,
        'animation-delay': this.options.delay
      });
    }

    hide() {
      if (this.shouldElementBeVisible(false)) {
        this.$wowElement.removeClass('animated');
        this.$wowElement.css({
          'animation-name': 'none',
          visibility: 'hidden'
        });
      } else {
        setTimeout(() => {
          this.$wowElement.removeClass('animated');
        }, this.countRemoveTime());
      }
      this.mdbWow();
      this.animated = !this.animated;
    }

    shouldElementBeVisible(state) {
      const thisElementOffset = this.getOffset(this.$wowElement[0]);
      const thisElementHeight = this.$wowElement.height();
      const documentHeight = $(document).height();
      const windowHeight = window.innerHeight;
      const scroll = window.scrollY;

      const isElementTopVisible = windowHeight + scroll - this.options.offset > thisElementOffset;
      const isElementBottomVisible = windowHeight + scroll - this.options.offset > thisElementOffset + thisElementHeight;
      const isScrolledToTop = scroll < thisElementOffset;
      const isScrolledToBottom = scroll < thisElementOffset + thisElementHeight;
      const isDocumentHeightEqual = windowHeight + scroll === documentHeight;
      const isOffsetHigherThanDocument = thisElementOffset + this.options.offset > documentHeight;
      const isElementBottomHidden = windowHeight + scroll - this.options.offset < thisElementOffset;
      const isScrolledOverTop = scroll > thisElementOffset + this.options.offset;
      const isNotScrolledToTop = scroll < thisElementOffset + this.options.offset;
      const isScrolledOverElement = thisElementOffset + thisElementHeight > documentHeight - this.options.offset;

      let returnLogic = false;

      if (state) {
        returnLogic = isElementTopVisible && isScrolledToTop ||
                      isElementBottomVisible && isScrolledToBottom ||
                      isDocumentHeightEqual && isOffsetHigherThanDocument;
      } else {
        returnLogic = isElementTopVisible && isScrolledOverTop ||
                      isElementBottomHidden && isNotScrolledToTop ||
                      isScrolledOverElement;
      }
      return returnLogic;
    }

    countRemoveTime() {
      const defaultAnimationTime = this.$wowElement.css('animation-duration').slice(0, -1) * 1000;
      let removeTime = 0;

      if (this.options.duration) {
        removeTime = defaultAnimationTime + this.checkOptionsStringFormat(this.options.duration);
      }
      if (this.options.delay) {
        removeTime += this.checkOptionsStringFormat(this.options.delay);
      }
      return removeTime;
    }

    checkOptionsStringFormat(element) {
      let valueToReturn;

      if (element.toString().slice(-1) === 's') {
        valueToReturn =  element.toString().slice(0, -1);
      } else if (!isNaN(element.toString().slice(-1))) {
        valueToReturn = element;
      } else {
        return console.log('Not supported animation customization format.');
      }

      return valueToReturn;
    }

    getOffset(element) {
      const box = element.getBoundingClientRect();
      const body = document.body;
      const docEl = document.documentElement;
      const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      const clientTop = docEl.clientTop || body.clientTop || 0;
      const top = box.top + scrollTop - clientTop;

      return Math.round(top);
    }

    fallback() {
      return {
        _value: undefined,
        or(value) {
          if (typeof value !== 'undefined' && typeof this._value === 'undefined') {
            this._value = value;
          }
          return this;
        },
        value() {
          return this._value;
        }
      };
    }
  }

  $.fn.wow = function (options) {
    this.each(function () {
      const mdbWow = new MDBWow($(this), options);
      mdbWow.init();
    });
  };

  window.WOW = WOW;

});
