var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($) {

// To understand behaviors, see https://drupal.org/node/756722#behaviors
    Drupal.behaviors.factorymobile = {
      attach: function (context, settings) {
      
        // Close menu when clicking outside of it
        $(document).on('click', function(event) {
          if (!$(event.target).closest('nav#mobile').length) {
            // Hide the menus.
            $('.mobile__content__box').hide();
            $('.mobile__tabs__tab').removeClass('active');
          }
        });
        
        // Focus on search bar when clicking search tab
        $(document).on('click', '#mobile__tabs__search', function(e) {
            $('#mobile__content__search input.form-text').focus();
        });       
        
        setupMenuBar();      
        setupMobile();      
        defaultMobileMenu();
        
        $('#mobile__content__search .form-actions input[type="submit"]').val('search').addClass('material-icons');
        
        $(window).resize(function(event){
          setTimeout(function(){defaultMobileMenu()}, 150);
        }); 
      }
    };


    function defaultMenu() {
      jQuery('#menubar > ul.menu li').each(function(){
        // hide all sub menu items
        jQuery(this).children('a').removeClass('tabover');
        jQuery(this).children('ul').hide();
        
        if (jQuery(this).children('a').hasClass('active') || jQuery(this).children('a').hasClass('active-trail')) {
          jQuery(this).children('a').addClass('tabover');   
        }
      });
    }

    function is_touch_device() {
      return !!('ontouchstart' in window) // works on most browsers 
          || !!('onmsgesturechange' in window); // works on ie10
    };
    
  // Mobile Menu for smartphone layouts
  function setupMenuBar() {
  
    // show all tabs and hide all content by default on page load
    $('.mobile__tabs__tab').show();
    $('.mobile__content__box').hide();
    
    $('#mobile__tabs__menu, #mobile__tabs__search, #mobile__tabs__user').click(function(e) {
      e.preventDefault();
      
      // Pull the unique portion of the id to make code more concise
      var tabId = this.id.substring(14);
      
      if ($(this).hasClass('active')) {
        $('.mobile__tabs__tab').removeClass('active');
        $('.mobile__content__box').hide();
        defaultMobileMenu();
      }
      else {
       $('.mobile__tabs__tab').removeClass('active');
       $('.mobile__content__box').hide();
       $('#mobile__tabs__' + tabId).addClass('active');  
       $('#mobile__content__' + tabId).fadeIn(200);
    
      };
   });
   
  }


  function defaultMobileMenu(){
    if ($('#superfish-1').css('display') == 'none') {
      $('#menutab').removeClass('active').show();
      $('#mobilecontent').hide();  
    }
    else {
      $('#menutab').removeClass('active').hide();
      $('#mobilecontent').fadeOut(200);
    }
  }


  function setupMobile(){
    $('#mobile__content__menu > ul ul').hide();
    $('<a href="#" class="menu-expander material-icons">add</a>').insertBefore('#mobile__content__menu > ul ul');

    $('.menu-expander').click(function(e) {
      e.preventDefault();
      
      if ($(this).hasClass('expanded')) {
        $(this).removeClass('expanded');
        $(this).text('add');
        $(this).siblings('ul.menu').hide();
      }
      else {
        $(this).addClass('expanded');
        $(this).text('remove');
        $(this).siblings('ul.menu').fadeIn(200);    
      };
   });

    
    $('#menubar #mobilecontent > ul > li').each(function(){
      if ($(this).hasClass('expanded')) {
        $(this).children('.menuexpander').addClass('expand');
      }
    });    
    
    $('.menuexpander.expand, .menuexpander.collapse').click(function(e) {
      e.preventDefault();
      if ($(this).hasClass('expand')) {
        $(this).siblings('ul.menu').fadeIn(200);
        $(this).removeClass('expand').addClass('collapse');
        $(this).attr('title', 'Collapse Sub-Menu');
      }
      else if($(this).hasClass('collapse')) {
        $(this).siblings('ul.menu').fadeOut(200);
        $(this).removeClass('collapse').addClass('expand');
        $(this).attr('title', 'Expand Sub-Menu');
      }
    });
  }

})(jQuery);;


 }

/*
     FILE ARCHIVED ON 17:51:01 Jul 11, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:07:43 Nov 14, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  RulesEngine.query: 85.142 (3)
  PetaboxLoader3.datanode: 34.796 (2)
*/