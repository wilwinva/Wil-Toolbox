'use strict';

/**
 * @ngdoc function
 * @name insideApp.component:AroundSandia
 * @description
 * # Around Sandia
 * Around Sandia js for the insideApp
 */
(function (AroundSandia, $, undefined) {
//(function($, document, window, undefined)
  /*$(document).ready(function (e) {*/

    AroundSandia.init = function () {
      AroundSandia.resizeIntervalID = 1;
      $.getJSON("https://info.sandia.gov/around_sandia/category/active/?json=1&count=7&callback=?", function (data) {
        if (data.count == 1) {
          $(".aroundSandia").addClass("uno");
        }

        if (data.count == 2) {
          $(".aroundSandia").addClass("dos");
        }

        var items = [];
        var items2 = [];
        $.each(data.posts, function (index, value) {
          var str = '<li id="story' + (index + 1) + '"';

          if (index === 0) {
            if (value.thumbnail_images) {
              if (value.thumbnail_images.blog_featured.width < value.thumbnail_images.blog_featured.height) {
                $(".aroundSandia").addClass("portrait");
              } else {
                //
              }
            }
              AroundSandia.getSize();
            str += ' class="feature aspectwrapper"';
          } else if (index == 1 && data.count == 2) {
            str += ' class="subList"';
          } else if (index < 3) {
            str += ' class="subFeature aspectwrapper2"';
          } else {
            str += ' class="subList"';
          }
          if (index < 3 && value.thumbnail_images) {
            if (index == 1 && data.count == 2) {
              //
            } else {
              str += ' style="background-image: url(' + unescape(value.thumbnail_images.blog_featured.url) + ');"';
            }
          }
          str += '>';
          if (index < 3 && data.count != 2) {
            str += '<div class="content">';
          }
          str += '<h3>';
          if (value.url != "") {
//removing target="_blank" US5458 TA12052  str += '<a target="_blank" href="' + value.url + '">';
            str += '<a href="' + value.url + '">';
          }

          // Title truncation
          var text = value.title;
          var maxLength = 50;
          if (text.length > maxLength) {
            var output = /^.{0,50}(?=[\.,; ])\b/.exec(text)[0];
            str += output + "...";
          }
          else {
            str += value.title;
          }
          // End title truncation


          if (value.url != "") {
            str += '</a>';
          }
          str += '</h3>';
          str += AroundSandia.addSocial(value);
          if (index < 3 && data.count != 2) {
            str += '</div>';
          }
          str += '</li>';
          if (index < 3) {
            if (index == 1 && data.count == 2) {
              items2.push(str);
            } else {
              items.push(str);
            }

          } else {
            items2.push(str);
          }
        });
        $("<ul/>", {"class": "upper", "id": "stage", html: items.join("")}).prependTo(".aroundSandia");
        $(".aroundSandia .footer");
		//$(".aroundSandia .footer").before($("<ul/>", {"class": "lower", "id": "stage2", html: items2.join("")}));

        $(".aroundSandia").trigger("as_loaded", [data.posts]);
        var region = $(".aroundSandia").closest('#regionCenter');
      });

      AroundSandia.getSize();

      /* $(".aroundSandia").closest('table').find('.dnd-handle').on("mouseup", function (event) {
        AroundSandia.resizeIntervalID = window.setTimeout(function () {
          AroundSandia.getSize();
          window.clearInterval(AroundSandia.resizeIntervalID);
        }, 500);
      }); */

    };

    AroundSandia.addSocial = function (value) {

      var str = '<div class="socialLinks">';
      str += '<a href="' + value.url + '#comments" class="commentCount" title="Comment on this article" target="_blank">' + value.comment_count + '</a>';
      str += '<a class="plugIt" title="Plug this article" href="'
      str += 'https://rails-rn-prod.sandia.gov/plug/articles/plug?url=' + encodeURIComponent(value.url);
      str += '" target="_blank">Plug it</a></div>';

      return str;
    };


    AroundSandia.getSize = function () {
      var width = $('#aroundSandia').width();

        if (width >= 440 && width <= 560 &&     !$('.aroundSandia').hasClass('portrait')) {
            $('.aroundSandia.narrow').removeClass('narrow');
            $('.aroundSandia').addClass('layout2');
        }
        else {
            $('.aroundSandia.layout2').removeClass('layout2');
            if (width <= 440) {
                $('.aroundSandia').addClass('narrow');
            } else {
            $('.aroundSandia.narrow').removeClass('narrow');
            }
        }
    };

  /*
    AroundSandia.init();

    $(window).resize(function () {
      window.clearInterval(AroundSandia.resizeIntervalID);
      AroundSandia.resizeIntervalID = null;
      AroundSandia.resizeIntervalID = window.setTimeout(function () {
        AroundSandia.getSize();
        window.clearInterval(AroundSandia.resizeIntervalID);
      }, 500);
    });
  }).delay(1500);
   */
//}(jQuery,document,window)
}(window.AroundSandia = window.AroundSandia || {}, jQuery));
