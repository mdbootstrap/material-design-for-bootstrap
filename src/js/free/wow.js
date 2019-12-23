'use strict';

var WOW;

(function ($) {

  WOW = function WOW() {

    return {

      init: function init() {

        var animationName = [];

        var once = 1;

        function mdbWow() {

          var windowHeight = window.innerHeight;
          var scroll = window.scrollY;

          $('.wow').each(function () {

            if ($(this).css('visibility') == 'visible') {
              return;
            }

            if (windowHeight + scroll - 100 > getOffset(this) && scroll < getOffset(this) || windowHeight + scroll - 100 > getOffset(this) + $(this).height() && scroll < getOffset(this) + $(this).height() || windowHeight + scroll == $(document).height() && getOffset(this) + 100 > $(document).height()) {

              var index = $(this).index('.wow');

              var delay = $(this).attr('data-wow-delay');

              if (delay) {

                delay = $(this).attr('data-wow-delay').slice(0, -1

                );
                var self = this;

                var timeout = parseFloat(delay) * 1000;

                $(self).addClass('animated');
                $(self).css({
                  'visibility': 'visible'
                });
                $(self).css({
                  'animation-delay': delay
                });
                $(self).css({
                  'animation-name': animationName[index]
                });

                var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;

                if ($(this).attr('data-wow-delay')) {

                  removeTime += $(this).attr('data-wow-delay').slice(0, -1) * 1000;
                }

                var self = this;

                setTimeout(function () {

                  $(self).removeClass('animated');
                }, removeTime);
              } else {

                $(this).addClass('animated');
                $(this).css({
                  'visibility': 'visible'
                });
                $(this).css({
                  'animation-name': animationName[index]
                });

                var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;

                var self = this;

                setTimeout(function () {

                  $(self).removeClass('animated');
                }, removeTime);
              }
            }
          });
        }

        function appear() {

          $('.wow').each(function () {

            var index = $(this).index('.wow');

            var delay = $(this).attr('data-wow-delay');

            if (delay) {

              delay = $(this).attr('data-wow-delay').slice(0, -1);

              var timeout = parseFloat(delay) * 1000;

              $(this).addClass('animated');
              $(this).css({
                'visibility': 'visible'
              });
              $(this).css({
                'animation-delay': delay + 's'
              });
              $(this).css({
                'animation-name': animationName[index]
              });
            } else {

              $(this).addClass('animated');
              $(this).css({
                'visibility': 'visible'
              });
              $(this).css({
                'animation-name': animationName[index]
              });
            }
          });
        }

        function hide() {

          var windowHeight = window.innerHeight;
          var scroll = window.scrollY;

          $('.wow.animated').each(function () {

            if (windowHeight + scroll - 100 > getOffset(this) && scroll > getOffset(this) + 100 || windowHeight + scroll - 100 < getOffset(this) && scroll < getOffset(this) + 100 || getOffset(this) + $(this).height > $(document).height() - 100) {

              $(this).removeClass('animated');
              $(this).css({
                'animation-name': 'none'
              });
              $(this).css({
                'visibility': 'hidden'
              });
            } else {

              var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;

              if ($(this).attr('data-wow-delay')) {

                removeTime += $(this).attr('data-wow-delay').slice(0, -1) * 1000;
              }

              var self = this;

              setTimeout(function () {

                $(self).removeClass('animated');
              }, removeTime);
            }
          });

          mdbWow();

          once--;
        }

        function getOffset(elem) {

          var box = elem.getBoundingClientRect();

          var body = document.body;
          var docEl = document.documentElement;

          var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;

          var clientTop = docEl.clientTop || body.clientTop || 0;

          var top = box.top + scrollTop - clientTop;

          return Math.round(top);
        }

        $('.wow').each(function () {

          $(this).css({
            'visibility': 'hidden'
          });
          animationName[$(this).index('.wow')] = $(this).css('animation-name');
          $(this).css({
            'animation-name': 'none'
          });
        });

        $(window).scroll(function () {

          if (once) {

            hide();
          } else {

            mdbWow();
          }
        });

        appear();
      }
    };
  };
})(jQuery);

window.WOW = WOW;