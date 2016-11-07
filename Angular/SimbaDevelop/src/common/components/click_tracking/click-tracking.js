/**
 * Created by awshwer on 4/6/2016.
 */
angular.module('snlComponents.snlClickTracking', [])
    /**
     * @ngdoc directive
     * @name snlComponents.directive:snlClickTracking
     * @restrict A
     * @params $location
     * @description used click tracking
     */
    .directive('snlClickTracking', function ($location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
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

                element.on("click", function () {
                    var userName = getCookie('userid');
                    var envUrl = $location.absUrl();
                    if (envUrl.indexOf("localhost") > -1) {
                        //if localhost
                        console.info('you clicked on the directive ' + attrs.snlClickTracking);
                    } else {
                        send_add_data("clickType=" + attrs.snlClickTracking + "&username=" + userName);
                    }

                });
            }
        }
    });
