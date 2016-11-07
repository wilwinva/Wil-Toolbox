// scroll to top thing
//plugin
'use strict';

$.fn.topLink = function(settings) {
  settings = $.extend({
    min: 1,
    fadeSpeed: 100
  }, settings);
  return this.each(function() {
    //listen for scroll
    var el = $(this);
    el.hide(); //in case the user forgot
    $(window).scroll(function() {
      if($(window).scrollTop() >= settings.min)
      {
        el.fadeIn(settings.fadeSpeed);
      }
      else
      {
        el.fadeOut(settings.fadeSpeed);
      }
    });
  });
};

$(document).ready(function(){
  $('<a style="display: inline;" id="backToTop">Top</a>').prependTo($('body'));
  $('#backToTop').topLink({
    min: 500,
    fadeSpeed: 100
  });

  //smoothscroll
  $('#backToTop').click(function() {    
    $("html, body").animate({ scrollTop: 0 }, 300);
  });
});