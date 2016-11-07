'use strict';
angular.module('enApp')
/**
 * @ngdoc controller
 * @name enApp.controller:SubscriptionCtrl
 * @description controller for Subscription template
 */
		.controller('SubscriptionCtrl', ['insideApiModel','$scope','$http', '$state', function (insideApiModel,$scope, $http, $state) {
        var self = this;

		$scope.formData = {};
			/**
			 * @ngdoc method
			 * @name get
			 * @methodOf enApp.controller:SubscriptionCtrl
			 * @description - get to do the processForm
			 */
		$scope.processForm = function() {
			console.log( $scope.formData );
		  $http({
		  method  : 'POST',
		  url     : '/',
		  data    : $.param($scope.formData),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		 })
		  .success(function(data) {
		    console.log(data);

		    if (!data.success) {
		      // if not successful, bind errors to error variables
		      $scope.errorName = data.errors.name;
		      $scope.errorSuperhero = data.errors.superheroAlias;
		    } else {
		      // if successful, bind success message to message
		      $scope.message = data.message;
				$state.go('home.confirmation', {}, {reload: true});
		    }
		  });
		};

    }]);
