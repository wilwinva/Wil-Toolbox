'use strict';

angular.module('enApp')
/**
 * @ngdoc controller
 * @name enApp.controller:UnsubscribeCtrl
 * @description controller for Unsubscribe template
 */
    .controller('UnsubscribeCtrl', function ($scope, $http) {
        var self = this;
      /**
       * @ngdoc method
       * @name get
       * @methodOf enApp.controller:UnsubscribeCtrl
       * @description - get to do the unsubscribe
       */
	    $http.get("/doUnsubscribed")
	    .then(function(response) {
	    	$scope.res = true;
	        $scope.msg = "You are now unsubscribed.";
	    }, function(response) {
	    	$scope.res = false;
	        $scope.msg = "Something went wrong...";
	    });
    });

