angular.module('example', [])
  .controller('TabsCtrl', function() {
    var tabs = this;

    tabs.tabList = [];

    tabs.selectTab = function(tab) {
      tabs.tabList.forEach(function(tab) {
        tab.selected = false;
      });

      tab.selected = true;
      tabs.selectedTab = tab;
    };

    tabs.registerTab = function(tab) {
      if(!tabs.selectedTab) {
        tabs.selectTab(tab);
      }

      tabs.tabList.push(tab);
    }
  })
  .directive('tabs', function() {
    return {
      restrict: 'E',
      scope: {},
      transclude: true,
      templateUrl: 'tabs.tpl.html',
      controller: 'TabsCtrl as tabs'
    };
  })
  .directive('tabPane', function() {
    return {
      restrict: 'E',
      scope: {
        label: '@'
      },
      require: '^tabs',
      transclude: true,
      template: '<div ng-if="selected" ng-transclude></div>',
      link: function(scope, element, attrs, tabsCtrl) {
        //console.log(tabsCtrl)
        tabsCtrl.registerTab(scope);
      }
    };
  })

;
