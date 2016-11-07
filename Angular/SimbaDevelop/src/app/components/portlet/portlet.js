'use strict';

angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlPortlet
     * @restrict E
     * @scope
     * @replace true
     * @transclude true
     * @description used to build an header using templateUrl app/components/portlet/portlet.tpl.html
     */
    .directive('snlPortlet', ['API_URL', 'ENV', '$http', function (API_URL, ENV, $http) {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          expanded: '@',
          portletName: '@',
          edit: '@',
          id: '@',
          delete: '@',
          portletClass: '@',
          error: '=',
          updateExpand: '&'
        },
        templateUrl: 'app/components/portlet/portlet.tpl.html',
        //controller: 'PortletCtrl as portletCtrl',
        link: function (scope) {
          scope.updateExpand = function (portletName, expanded) {
            var exp = expanded ? '1' : '0';
            var data = {
              expanded: exp
            };

            function getCookie(cname) {
              var name = cname + "=";
              var ca = document.cookie.split(';');
              for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                  c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
                }
              }
              return "";
            }

            var userName = getCookie('userid');
            send_add_data("clickType=" + portletName + " expand" + expanded + "&username=" + userName);
            $http.put(ENV.insideApiUrl + API_URL.preferences + '/' + portletName, data)
                .then(function (response) {
                }, function (error) {
                  console.error('An error occurred updating Portlet expanded.', error.data);
                });
          }
        }
      }
    }]);
function maxHeightReached(obj) {
  var $parentFadeIt = $(obj).closest(".fadeIt");
  var $fadeIts = $parentFadeIt.find(".fadeIt").add($parentFadeIt);
  var currentMaxHeight = parseInt($parentFadeIt.outerHeight(), 10);
  var $currentMaxHeightDiv = $parentFadeIt.children('.max-height-reached');
  $currentMaxHeightDiv.hide();
  currentMaxHeight = currentMaxHeight * 5;
  $fadeIts.css({'max-height': currentMaxHeight + 'px'});
  $currentMaxHeightDiv.css({'top': ((currentMaxHeight - 94) + 'px')}).show();
  return false;
}
