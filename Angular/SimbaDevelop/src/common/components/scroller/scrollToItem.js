'use strict';

angular.module('snlComponents.scroller', [])
/**
 * @ngdoc directive
 * @name insideApp.directive:snlScrollOnChange
 * @restrict A
 * @scope
 * @description used to scroll to specific area of page on element change
 */.directive('snlScrollOnChange', function () {
        return {
            restrict: 'A',
            scope: {
                scrollTo: '@'
            },
            link: function (scope, $elm) {
                $elm.on('change', function () {
                    $('html,body').animate({scrollTop: $(scope.scrollTo).offset().top}, 'slow');
                });
            }
        }
    })
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlScrollOnClick
     * @restrict EA
     * @scope
     * @description used to scroll to specific area of page on element click
     */
    .directive('snlScrollOnClick', function () {
            return {
                restrict: 'EA',
                scope: {
                    scrollTo: '@'
                },
                link: function (scope, $elm) {
                    $elm.on('click', function () {
                        $('html,body').animate({scrollTop: $(scope.scrollTo).offset().top}, 'slow');
                    });
                }
            }
        }
    )
;
