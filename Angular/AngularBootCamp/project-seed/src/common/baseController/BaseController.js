angular.module('project-seed.base-controller', [
])

/**
 * Base "class" for controllers that share app-wide common functionality
 * including concerns such as authentication.
 */
  .factory('BaseCtrl', function (DispatchingController) {
    function BaseCtrl($scope) {
      angular.extend(this, new DispatchingController($scope));
    }
    return BaseCtrl;
  })
;
