'use strict';

angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlTeasers
     * @restrict E
     * @scope
     * @replace true
     * @description used to build an teasers using templateUrl app/components/topRegion/teasers/teasers.tpl.html and TeasersCtrl
     */
    .directive('snlTeasers', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'app/components/topRegion/teasers/teasers.tpl.html',
            controller: 'TeasersCtrl as teasersCtrl'
        };
    })
    /**
     * @ngdoc controller
     * @name insideApp.controller:TeasersCtrl
     * @description Teasers Controller of the insideApp
     */
    .controller('TeasersCtrl', ['$scope', 'ENV', 'insideApiModel', function ($scope, ENV, insideApiModel) {
        this.data = ' ';
        var self = this;
        self.pastTeasersUrl = ENV.pastTeasersUrl;

        /**
         * @ngdoc method
         * @name fetchTeasers
         * @methodOf insideApp.controller:TeasersCtrl
         * @description - fetch the teaser messages from teasersModel.fetchTeasers method
         */
        insideApiModel.fetch(ENV.teasersUrl).then(function (data) {
            //reset error
            $scope.error = false;
            self.error = false;

            self.data = data;
        }, function (reason) {
            $scope.error = true;
            self.error = true;
            self.data = [];
        });
    }])
;
