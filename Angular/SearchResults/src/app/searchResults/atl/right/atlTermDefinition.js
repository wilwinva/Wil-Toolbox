'use strict';

/**
 * @ngdoc directive
 * @name searchResultsApp.directive:getTermDefinition & assignTermAction
 * @description
 * # getTermDefinition serializes json string to extract data and assigns directive to term links.
 * # assignTermAction carrys out the function of term links.
 */
angular.module('searchResultsApp')
  .directive('snlTermDefinition', function($compile) {
    return {
      restrict: 'E',
      scope: {
        termObj: '@',
        parentIndex: '@'
      },
      templateUrl: 'app/searchResults/atl/right/atlTermDefinition.tpl.html',
      controller: ['$scope', function($scope) {
        // Appending brackets to iterate through objects.
        var decodedString = decodeURIComponent( '['+$scope.termObj+']' );

        $scope.terms = JSON.parse(decodedString);

        // Used to make unique elements.
        $scope.parent = $scope.parentIndex;

      }],
      link: function ( $scope) {
        var $termElements = $('.faq-answer a[href*="?termid"]');

        // Find term def links and add directive to them.
        $termElements.each(function( index ){
          var $elem = $(this);
          var termId = $elem.attr('href').split('?termid=')[1];

            if( index < $scope.terms.length ){
              // Remove href to prevent re-adding directive.
              $elem.attr('href','')
              .attr('snl-assign-term-action','')
              .attr('link-number', termId)
              .attr('child-of', $scope.parentIndex);

              // Initialize new directive.
              $compile($elem)($scope);
            }
        });

      }
    };
  })
  .directive('snlAssignTermAction', function(){
    return {
      restrict: 'A',
      scope: {
        linkNumber: '@',
        childOf: '@'
      },
      link: function ($scope, element){
        var $popupElem = '#dialog-'+$scope.childOf+'-'+$scope.linkNumber;
        var $mouseOnDialog = false;
        var interval = null;

        // necessary to avoid infinite compile loop
        element.removeAttr('snl-assign-term-action');

        $scope.openPopUp = function() {

          // Clear if still running.
          clearInterval(interval);
          var $dialog = $($popupElem)
            .dialog({
              autoOpen: false,
              title: 'Dictionary',
              width: '50%',
              show: {
                  effect: 'fade',
                  duration: 100
              },              
              hide: {
                  effect: 'fade',
                  duration: 1000
              }
            });
          $dialog.dialog('open');

          // Reposition to center
          interval = setInterval( function() {
            $('.ui-dialog').position({
               my: "center",
               at: "center",
               of: window
            });
          }, 50);
          setTimeout( function(){ 
            clearInterval(interval);
          }, 2000);
          
          return false;
        };

        $scope.closepopup = function() {
          var $dialogParent = $($popupElem).closest('.ui-dialog');

          $($dialogParent).bind({
            mouseenter: function(){
              $mouseOnDialog = true;
            },
            mouseleave: function(){
              $($popupElem).dialog('close');
              $mouseOnDialog = false;
            }
          });

          function tryClosingAgain(){
            if( $mouseOnDialog == false ){
              $($popupElem).dialog('close');
            }
          }

          setTimeout(tryClosingAgain, 200);
        };

        element.bind({
          mouseenter: function(e){
          e.preventDefault();
            $scope.openPopUp();
          },
          mouseleave: function(){
            $scope.closepopup();
          }
        });

      }
    };
  });
