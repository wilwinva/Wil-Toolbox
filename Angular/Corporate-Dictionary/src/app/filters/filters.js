'use strict';
/**
 * @ngdoc overview
 * @project CADM
 * @name filters
 * @description
 * # corpDictApp
 *
 * Filters module of the application.
 */
angular.module('corpDictApp')
    .filter('html', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    })
    .filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase) {
                text = text.replace(new RegExp('(' + phrase.text + ')', 'gi'),
                    '<span class="highlighted">$1</span>');
            }
            return $sce.trustAsHtml(text);
        };
    })
    .filter('highlightG', function ($sce) {
        return function (text, phrase) {
            if (phrase && phrase.category) {
                text = text.replace(new RegExp('(' + phrase.category.name + ')', 'gi'),
                    '<span class="highlightedG">$1</span>');
            }
            return $sce.trustAsHtml(text);
        };
    })
;
