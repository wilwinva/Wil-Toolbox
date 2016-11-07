'use strict';

angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlBrowseTechweb
     * @restrict E
     * @scope
     * @replace false
     * @description used to build an header using templateUrl 'app/components/portlet/api/portlets/browseTechweb/browseTechweb.tpl.html and browseTechwebCtrl
     */
    .directive('snlBrowseTechweb', ['API_URL', 'ENV', '$http', function (API_URL, ENV, $http) {
        var controller = function () {
            this.categoryExpand = function (portletName, expanded) {
                var exp = expanded ? '1' : '0';
                var data = {
                    expanded: exp
                };

                $http.put(ENV.insideApiUrl + API_URL.preferences + '/' + portletName, data)
                    .then(function (response) {
                    }, function (error) {
                        console.error('An error occurred updating expanded.', error.data);
                    });
            }
        };
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/components/portlet/api/portlets/browseTechweb/browseTechweb.tpl.html',
            controller: controller,
            controllerAs: 'browseTechwebCtrl'
        };
    }])
;
