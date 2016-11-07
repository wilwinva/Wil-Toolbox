'use strict';

/**
 * @ngdoc directive
 * @name searchResultsApp.directive:snlAtlMap
 * @description
 * # snlAtlMap
 */
angular.module('searchResultsApp')
  .directive('snlAtlMap', function () {
    return {
      restrict: 'E',
      scope: {
        room: '=',
        username: '=',
        mapon: '='
      },
      template: '<div id="map" class="map" style="height:424px"></div>',
      link: function postLink(scope) {
        var roomNum = "";
        if (!scope.mapon)
          return;

        //var mapLink = unescape(atlEntry.link);
        // var term = mapLink.substring(mapLink.indexOf('=') + 1, mapLink.length);
        initSandiaMap({mapDiv: 'div.map', interactive: true, search: false}, function (map) {
          window.map = map;

          if (scope.room != null) {
            if (isNaN(parseInt(scope.room))) {
              //console.info('room num is set to scope room num ' + scope.room);
              roomNum = scope.room;
              if (scope.room.indexOf("m") == 0 && scope.room.indexOf("mo") == -1) {

                roomNum = scope.room.split('m').join('mo');

              }
            } else {
              //console.info('room num is set to scope room num ' + parseInt(scope.room));
              roomNum = parseInt(scope.room);
            }
            map.showBuildings(roomNum + ''); //scope.atl.title
          }

          if (scope.username != null)
            map.showPeopleByUsername(scope.username);
        });
      }
    };
  })
;
