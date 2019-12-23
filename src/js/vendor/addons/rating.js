(function ($) {
  $.fn.mdbRate = function () {
    var $stars;
    // Custom whitelist to allow for using HTML tags in popover content
    var myDefaultWhiteList = $.fn.tooltip.Constructor.Default.whiteList
    myDefaultWhiteList.textarea = [];
    myDefaultWhiteList.button = [];

    var $container = $(this);

    var titles = ['Very bad', 'Poor', 'OK', 'Good', 'Excellent'];

    for (var i = 0; i < 5; i++) {
      $container.append(`<i class="py-2 px-1 rate-popover" data-index="${i}" data-html="true" data-toggle="popover"
      data-placement="top" title="${titles[i]}"></i>`);
    }

    $stars = $container.children();

    if ($container.hasClass('rating-faces')) {
      $stars.addClass('far fa-meh-blank');
    } else if ($container.hasClass('empty-stars')) {
      $stars.addClass('far fa-star');
    } else {
      $stars.addClass('fas fa-star');
    }

    $stars.on('mouseover', function () {
      var index = $(this).attr('data-index');
      markStarsAsActive(index);
    });

    function markStarsAsActive(index) {
      unmarkActive();

      for (var i = 0; i <= index; i++) {

        if ($container.hasClass('rating-faces')) {
          $($stars.get(i)).removeClass('fa-meh-blank');
          $($stars.get(i)).addClass('live');

          switch (index) {
            case '0':
              $($stars.get(i)).addClass('fa-angry');
              break;
            case '1':
              $($stars.get(i)).addClass('fa-frown');
              break;
            case '2':
              $($stars.get(i)).addClass('fa-meh');
              break;
            case '3':
              $($stars.get(i)).addClass('fa-smile');
              break;
            case '4':
              $($stars.get(i)).addClass('fa-laugh');
              break;
          }

        } else if ($container.hasClass('empty-stars')) {
          $($stars.get(i)).addClass('fas');
          switch (index) {
            case '0':
              $($stars.get(i)).addClass('oneStar');
              break;
            case '1':
              $($stars.get(i)).addClass('twoStars');
              break;
            case '2':
              $($stars.get(i)).addClass('threeStars');
              break;
            case '3':
              $($stars.get(i)).addClass('fourStars');
              break;
            case '4':
              $($stars.get(i)).addClass('fiveStars');
              break;
          }
        } else {
          $($stars.get(i)).addClass('amber-text');

        }
      }
    }

    function unmarkActive() {
      $stars.parent().hasClass('rating-faces') ? $stars.addClass('fa-meh-blank') : $stars;
      $container.hasClass('empty-stars') ? $stars.removeClass('fas') : $container;
      $stars.removeClass('fa-angry fa-frown fa-meh fa-smile fa-laugh live oneStar twoStars threeStars fourStars fiveStars amber-text');
    }

    $stars.on('click', function () {
      $stars.popover('hide');
    });

    // Submit, you can add some extra custom code here
    // ex. to send the information to the server
    $container.on('click', '#voteSubmitButton', function () {
      $stars.popover('hide');
    });

    // Cancel, just close the popover
    $container.on('click', '#closePopoverButton', function () {
      $stars.popover('hide');
    });

    if ($container.hasClass('feedback')) {

      $(function () {
        $stars.popover({
          // Append popover to #rateMe to allow handling form inside the popover
          container: $container,
          // Custom content for popover
          content: `<div class="my-0 py-0"> <textarea type="text" style="font-size: 0.78rem" class="md-textarea form-control py-0" placeholder="Write us what can we improve" rows="3"></textarea> <button id="voteSubmitButton" type="submit" class="btn btn-sm btn-primary">Submit!</button> <button id="closePopoverButton" class="btn btn-flat btn-sm">Close</button>  </div>`
        });
      })
    }

    $stars.tooltip();
  }
})(jQuery);