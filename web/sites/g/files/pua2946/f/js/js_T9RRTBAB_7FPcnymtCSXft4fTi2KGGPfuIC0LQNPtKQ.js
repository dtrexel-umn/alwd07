(function ($) {
  //extend the drupal js object by adding in an a11y name-space
  Drupal.a11y = Drupal.a11y || { functions: {} };
})(jQuery);;
(function ($) {
  $(document).ready(function(){
    $('#a11y_opendyslexic_checkbox').click(function(){
      Drupal.a11y.opendyslexic(this.checked);
    });
    // test for cookie being set
    if ($.cookie('a11y_opendyslexic') == 'true') {
      $('#a11y_opendyslexic_checkbox').click();
    }
  });
  // opendyslexic functionality
  Drupal.a11y.opendyslexic = function(opendyslexic){
    if (opendyslexic == true) {
      $("body").addClass('a11y-opendyslexic');
      $("body").append($("<link id='a11y_opendyslexic_styles' rel='stylesheet' href='" + Drupal.settings.a11y.path + "plugins/opendyslexic/opendyslexic.css' type='text/css' media='screen' />"));
    }
    else {
      $("#a11y_opendyslexic_styles").remove();
      $("body").removeClass('a11y-opendyslexic');
    }
    $.cookie('a11y_opendyslexic', opendyslexic, { path: '/', domain: Drupal.settings.a11y.domain });
  };
})(jQuery);;
(function ($) {
  $(document).ready(function(){
    $('#a11y_contrast_checkbox').click(function(){
      Drupal.a11y.contrast(this.checked);
    });
    $('#a11y_invert_checkbox').click(function(){
      Drupal.a11y.invert(this.checked);
    });
    // test for cookie being set
    if ($.cookie('a11y_contrast') == 'true') {
      $('#a11y_contrast_checkbox').click();
    }
    // test for cookie being set
    if ($.cookie('a11y_invert') == 'true') {
      $('#a11y_invert_checkbox').click();
    }
  });
  // contrast functionality
  Drupal.a11y.contrast = function(contrast){
    if (contrast == true) {
      $("body").addClass('a11y-contrast');
      $("body").append($("<link id='a11y_contrast_styles' rel='stylesheet' href='" + Drupal.settings.a11y.path + "plugins/contrast/contrast.css' type='text/css' media='screen' />"));
    }
    else {
      $("body").removeClass('a11y-contrast');
      $("#a11y_contrast_styles").remove();
    }
    $.cookie('a11y_contrast', contrast, { path: '/', domain: Drupal.settings.a11y.domain });
  };
  // invert functionality
  Drupal.a11y.invert = function(invert){
    if (invert == true) {
      $("body").addClass('a11y-invert');
      $("body").append($("<link id='a11y_invert_styles' rel='stylesheet' href='" + Drupal.settings.a11y.path + "plugins/contrast/invert.css' type='text/css' media='screen' />"));
    }
    else {
      $("body").removeClass('a11y-invert');
      $("#a11y_invert_styles").remove();
    }
    $.cookie('a11y_invert', invert, { path: '/', domain: Drupal.settings.a11y.domain });
  };
})(jQuery);;
(function ($) {
  $(document).ready(function(){
    $('#a11y_animation_checkbox').click(function(){
      Drupal.a11y.animation(this.checked);
    });
    // test for cookie being set
    if ($.cookie('a11y_animation') == 'true') {
      $('#a11y_animation_checkbox').click();
    }
  });
  // animation functionality
  Drupal.a11y.animation = function(animation){
    if (animation == true) {
      $.fx.off = true;
      $("body").addClass('a11y-animation');
      $("body").append($("<link id='a11y_animation_styles' rel='stylesheet' href='" + Drupal.settings.a11y.path + "plugins/animation/animation.css' type='text/css' media='screen' />"));
    }
    else {
      $.fx.off = false;
      $("body").removeClass('a11y-animation');
      $("#a11y_animation_styles").remove();
    }
    $.cookie('a11y_animation', animation, { path: '/', domain: Drupal.settings.a11y.domain });
  };
})(jQuery);;
(function ($) {
  $(document).ready(function(){
    // test for cookie being set
    if ($.cookie('a11y_factor') != null) {
      Drupal.settings.a11y.factor = $.cookie('a11y_factor');
      Drupal.a11y.textsize(-2);
    }
  });
  //textsize functionality
  Drupal.a11y.textsize = function(scale){
    if(scale == 1 && Drupal.settings.a11y.factor < 2) {
      Drupal.settings.a11y.factor = Drupal.settings.a11y.factor + 0.25;
    }
    else if(scale == -1 && Drupal.settings.a11y.factor != 1) {
      Drupal.settings.a11y.factor = Drupal.settings.a11y.factor - 0.25;
    }
    else if(scale == 0) {
      Drupal.settings.a11y.factor = 1;
    }
    else if (Drupal.settings.a11y.factor > 2) {
      Drupal.settings.a11y.factor = 2;
    }
    // account for initial page load
    if (Drupal.settings.a11y.factor == null && scale == -2) {
      Drupal.settings.a11y.factor = 1;
    }
    if (Drupal.settings.a11y.factor == 1) {
      $("body").css({'zoom': '', '-moz-transform': '', '-moz-transform-origin': ''});
    }
    else {
      $("body").css({'zoom': Drupal.settings.a11y.factor, '-moz-transform': Drupal.settings.a11y.factor, '-moz-transform-origin': Drupal.settings.a11y.factor});
    }
    $.cookie('a11y_factor', Drupal.settings.a11y.factor, { path: '/', domain: Drupal.settings.a11y.domain });
  };
})(jQuery);;
(function ($) {
  $(document).ready(function(){
    $('#a11y_sim_dyslexia_checkbox').click(function(){
      Drupal.a11y.simulateDyslexia(this.checked);
    });
  });
  // dyslexia functionality
  Drupal.a11y.simulateDyslexia = function(dyslexia){
    if (dyslexia == true) {
      $("body").addClass('a11y-simulate-dyslexia');
      var getTextNodesIn = function(el) {
        return $(el).find(":not(iframe,script)").addBack().contents().filter(function() {
          return this.nodeType == 3;
        });
      };
      Drupal.settings.a11y.textNodes = getTextNodesIn($("p, h1, h2, h3"));
      Drupal.settings.a11y.wordsInTextNodes = [];
      for (var i = 0; i < Drupal.settings.a11y.textNodes.length; i++) {
        var node = Drupal.settings.a11y.textNodes[i];
        var words = []
        var re = /\w+/g;
        var match;
        while ((match = re.exec(node.nodeValue)) != null) {
          var word = match[0];
          var position = match.index;
          words.push({
            length: word.length,
            position: position
          });
        }
        Drupal.settings.a11y.wordsInTextNodes[i] = words;
      };
      setInterval(messUpWords, 50);
    }
    else {
      location.reload();
      $("body").removeClass('a11y-simulate-dyslexia');
    }
  };

  function isLetter(char) {
    return /^[\d]$/.test(char);
  }

  function messUpWords () {
    for (var i = 0; i < Drupal.settings.a11y.textNodes.length; i++) {
      var node = Drupal.settings.a11y.textNodes[i];
      for (var j = 0; j < Drupal.settings.a11y.wordsInTextNodes[i].length; j++) {
        // Only change a tenth of the words each round.
        if (Math.random() > 1/10) {
          continue;
        }
        var wordMeta = Drupal.settings.a11y.wordsInTextNodes[i][j];
        var word = node.nodeValue.slice(wordMeta.position, wordMeta.position + wordMeta.length);
        var before = node.nodeValue.slice(0, wordMeta.position);
        var after  = node.nodeValue.slice(wordMeta.position + wordMeta.length);
        node.nodeValue = before + messUpWord(word) + after;
      };
    };
  }
  function messUpWord (word) {
    if (word.length < 3) {
      return word;
    }
    return word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1];
  }
  function messUpMessyPart (messyPart) {
    if (messyPart.length < 2) {
      return messyPart;
    }
    var a, b;
    while (!(a < b)) {
      a = getRandomInt(0, messyPart.length - 1);
      b = getRandomInt(0, messyPart.length - 1);
    }
    return messyPart.slice(0, a) + messyPart[b] + messyPart.slice(a+1, b) + messyPart[a] + messyPart.slice(b+1);
  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
})(jQuery);;
