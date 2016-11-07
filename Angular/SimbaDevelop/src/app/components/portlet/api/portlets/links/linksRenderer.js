'use strict';

angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlLinksRenderOnFinish
     * @description Used on mylinks portlet to detect completion of asynchronous DOM loading of links.
     */
    .directive('snlLinksRenderOnFinish', function () {
        return function (scope) {
            // $last was used initially but only runs on the first ng-repeat finish.
            // When the model is changed (add a group), it wouldn't fire when the list
            // grew by one.  $first does fire when the list grows. So, using that here.
            //if (scope.$last) {
            ///    scope.$emit('event:table-loading-over');
            //}

            /*
             if (scope.$last || scope.$first) {
             scope.$emit('event:table-loading-over');
             }
             */
            // Danger! Hack alert...
            if (scope.$first || scope.$last) {
                if (scope.$last) {
                    scope.$emit('event:table-loading-over');
                }
                else {
                    scope.$emit('event:table-loading-over');
                }
            }
        }
    })
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlfocusOnShow
     * @restrict A
     * @description used to
     */
    .directive('snlfocusOnShow', function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                if ($attr.ngShow) {
                    $scope.$watch($attr.ngShow, function (newValue) {
                        if (newValue) {
                            $timeout(function () {
                                $element.focus();
                            }, 100);
                        }
                    })
                }
            }
        };
    });

function toggleCompact() {
    var $Links = $("#links");
    $Links.toggleClass("compact-space");
}
