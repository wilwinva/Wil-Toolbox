'use strict';
angular.module('vactApp.models')
    /**
     * @ngdoc service
     * @name vactApp.service:vactApiModel
     * @description
     * vactApi Model of the vactApp
     */
    .service('vactApiModel', ['$q', 'vactApiModelMock',
      function VactApiModel($q, vactApiModelMock) {
        var vactApiModel = this;

        /**
         * @ngdoc method
         * @name fetch
         * @methodOf vactApp.service:vactApiModel
         * @description - fetch mock data
         */
        vactApiModel.fetch = function (service) {
          console.log('Retrieving vact mock model data for ' + service);
          //read local data from vactApiModel mock
          return $q.when(vactApiModelMock[service]);
        };
      }
    ]);

