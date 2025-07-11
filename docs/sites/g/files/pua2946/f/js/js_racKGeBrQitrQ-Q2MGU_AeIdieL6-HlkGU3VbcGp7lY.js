(function($) {

  // Behavior to load FlexSlider
  Drupal.behaviors.flexslider = {
    attach: function(context, settings) {
      var id;
      var sliders = [];
      if ($.type(settings.flexslider) !== 'undefined' && $.type(settings.flexslider.instances) !== 'undefined') {

        for (id in settings.flexslider.instances) {

          if (settings.flexslider.optionsets[settings.flexslider.instances[id]] !== undefined) {
            if (settings.flexslider.optionsets[settings.flexslider.instances[id]].asNavFor !== '') {
              // We have to initialize all the sliders which are "asNavFor" first.
              _flexslider_init(id, settings.flexslider.optionsets[settings.flexslider.instances[id]], context);
            } else {
              // Everyone else is second
              sliders[id] = settings.flexslider.optionsets[settings.flexslider.instances[id]];
            }
          }
        }
      }
      // Slider set
      for (id in sliders) {
        _flexslider_init(id, settings.flexslider.optionsets[settings.flexslider.instances[id]], context);
      }
    }
  };

  /**
   * Initialize the flexslider instance
   */

  function _flexslider_init(id, optionset, context) {
    $('#' + id, context).once('flexslider', function() {
      // Remove width/height attributes
      // @todo load the css path from the settings
      $(this).find('ul.slides > li *').removeAttr('width').removeAttr('height');

      if (optionset) {
        // Add events that developers can use to interact.
        $(this).flexslider($.extend(optionset, {
          start: function(slider) {
            slider.trigger('start', [slider]);
          },
          before: function(slider) {
            slider.trigger('before', [slider]);
          },
          after: function(slider) {
            slider.trigger('after', [slider]);
          },
          end: function(slider) {
            slider.trigger('end', [slider]);
          },
          added: function(slider) {
            slider.trigger('added', [slider]);
          },
          removed: function(slider) {
            slider.trigger('removed', [slider]);
          },
          init: function(slider) {
            slider.trigger('init', [slider]);
          }
        }));
      } else {
        $(this).flexslider();
      }
    });
  }

}(jQuery));
;
(function ($) {

 /**
  * Get the total displacement of given region.
  *
  * @param region
  *   Region name. Either "top" or "bottom".
  *
  * @return
  *   The total displacement of given region in pixels.
  */
  if (Drupal.overlay) {
    Drupal.overlay.getDisplacement = function (region) {
      var displacement = 0;
      var lastDisplaced = $('.overlay-displace-' + region + ':last');
      if (lastDisplaced.length) {
        displacement = lastDisplaced.offset().top + lastDisplaced.outerHeight();

        // In modern browsers (including IE9), when box-shadow is defined, use the
        // normal height.
        var cssBoxShadowValue = lastDisplaced.css('box-shadow');
        var boxShadow = (typeof cssBoxShadowValue !== 'undefined' && cssBoxShadowValue !== 'none');
        // In IE8 and below, we use the shadow filter to apply box-shadow styles to
        // the toolbar. It adds some extra height that we need to remove.
        if (!boxShadow && /DXImageTransform\.Microsoft\.Shadow/.test(lastDisplaced.css('filter'))) {
          displacement -= lastDisplaced[0].filters.item('DXImageTransform.Microsoft.Shadow').strength;
          displacement = Math.max(0, displacement);
        }
      }
      return displacement;
    };
  };

})(jQuery);
;
Drupal.settings.spotlight_settings = Drupal.settings.spotlight_settings || {};

(function ($) {

  /**
   * Form behavior for Spotlight
   */
  Drupal.behaviors.panopolySpotlight = {
    attach: function (context, settings) {
      if ($('.field-name-field-basic-spotlight-items', context).length) {
        $('.field-name-field-basic-spotlight-items', context).each(function() {
          var rotation_time = $(this).find('.panopoly-spotlight-buttons-wrapper').data('rotation-time'),
              $widget = $(this),
              $slides = $widget.find('.panopoly-spotlight'),
              $controls = $widget.find('.panopoly-spotlight-buttons-wrapper li'),
              current = 0,
              timer = null;

          function start() {
            if (timer === null) {
              timer = setTimeout(rotate, rotation_time);
            }
          }

          function stop() {
            if (timer !== null) {
              clearTimeout(timer);
              timer = null;
            }
          }

          function rotate() {
            // Increment the current slide.
            current++;
            if (current >= $controls.length) {
              current = 0;
            }

            // Click the control for the next slide.
            $controls.eq(current).children('a').trigger('click.panopoly-widgets-spotlight');
          }

          // Navigation is hidden by default, display it if JavaScript is enabled.
          $widget.find('.panopoly-spotlight-buttons-wrapper').css('display', 'block');

          // Hide all the slides but the first one.
          $slides.hide();
          $slides.eq(0).show();
          $controls.eq(0).addClass('active');

          // Bind the event for the slide numbers.
          $controls.once('panopoly-spotlight').children('a').bind('click.panopoly-widgets-spotlight', function (event) {
            var selector = $(this).attr('href');
            if (selector.indexOf('#') === 0) {
              event.preventDefault();

              // Mark the slide number as active.
              $controls.removeClass('active');
              $(this).parent().addClass('active');

              // Hide all slides but the selected one.
              $slides.hide();
              $slides.filter(selector).show();

              // Start the timer over if it's running.
              if (timer !== null) {
                stop();
                start();
              }

              return false;
            }
          });

          // Bind events to all the extra buttonts.
          $widget.find('.panopoly-spotlight-pause-play').once('panopoly-spotlight').bind('click.panopoly-widgets-spotlight', function(event) {
            event.preventDefault();
            if ($(this).hasClass('paused')) {
              start();
              $(this).text(Drupal.t('Pause'));
              $(this).removeClass('paused');
            }
            else {
              stop();
              $(this).text(Drupal.t('Play'));
              $(this).addClass('paused');
            }
          });
          if ($widget.find('.panopoly-spotlight-previous').length && $widget.find('.panopoly-spotlight-next').length) {
            $widget.find('.panopoly-spotlight-previous').once('panopoly-spotlight').bind('click.panopoly-widgets-spotlight', function (event) {
              event.preventDefault();
              $widget.find('.panopoly-spotlight-pause-play:not(.paused)').trigger('click.panopoly-widgets-spotlight');
              var activeControl = $($controls.filter('.active'));

              if (activeControl.prev().length != 0) {
                activeControl.prev().children('a').trigger('click.panopoly-widgets-spotlight');
              }
              else {
                $controls.last().children('a').trigger('click.panopoly-widgets-spotlight');
              }
            });
            $widget.find('.panopoly-spotlight-next').once('panopoly-spotlight').bind('click.panopoly-widgets-spotlight', function (event) {
              event.preventDefault();
              $widget.find('.panopoly-spotlight-pause-play:not(.paused)').trigger('click.panopoly-widgets-spotlight');
              var activeControl = $($controls.filter('.active'));

              if (activeControl.next().length != 0) {
                activeControl.next().children('a').trigger('click.panopoly-widgets-spotlight');
              }
              else {
                $controls.first().children('a').trigger('click.panopoly-widgets-spotlight');
              }
            });
          }

          start();
        });
      }
    }
  };

})(jQuery);
