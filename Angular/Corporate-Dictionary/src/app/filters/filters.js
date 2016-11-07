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
    .filter('searchtypefilter', function () {
        return function (items, search) {
            function getCats(element, obj) {
                // grep will return an array of items containing the match (if the json's "categories" array contains the select box value.
                var temp = $.grep(element.categories, function (n) {
                    return n.name === search.category.name;
                });

                // If the grepped array is larger than 0, it found a match.
                if (temp.length > 0) {
                    // If obj, we're passing a search term or definition too. If it matches along with the cat, return it.
                    if (obj) {
                        if (obj.toLowerCase().indexOf(search.text.toLocaleLowerCase()) !== -1) {
                            return element;
                        }
                        else { // otherwise, dump it.
                            return false;
                        }
                    }
                    else { // We're not passing a search term.  Return the element that has a matching cat.
                        return element;
                    }
                }
                // Otherwise, the array was empty - grep found no matches.
                return false;
            }

            if (!search) {
                return items;
            }
            var searchText = search.text;
            if ((!searchText || angular.isUndefined(items) || '' === searchText || (typeof(items) === "undefined")) && !search.category) {
                return items; // No filtering.  Get out of here with all the results.
            }

            return items.filter(function (element) {
                // Dump items based on status (if chosen).
                if (search.active && search.active.value && search.active.value !== '' && element.deleteFlag !== search.active.value) {
                    return false;
                }
                var searchTerm = element.term.toLowerCase().indexOf(search.text.toLocaleLowerCase());
                var definitionTerm = element.definition.toLowerCase().indexOf(search.text.toLocaleLowerCase());
                var acronymTerm;
                if (element.acronym && typeof(element.acronym) !== "undefined") {
                    acronymTerm = element.acronym.toLowerCase().indexOf(search.text.toLocaleLowerCase());
                }

                // If checkbox "term" is checked AND there is a search value AND and it appears in the json's "term"
                if (search.term && searchText && (definitionTerm >= 0 || acronymTerm >= 0)) {
                    // If the category select is in use, return only if the element's category matches (getCats function
                    // with the search string). If not, return the element.
                    console.log('in search.term');
                    return (search.category) ? getCats(element, element.term) : element;
                }
                // If checkbox "acronym" is checked AND there is a search value AND and it appears in the json's "term"
                if (search.acronym && searchText && (definitionTerm >= 0 || acronymTerm >= 0)) {
                    // If the category select is in use, return only if the element's category matches (getCats function
                    // with the search string). If not, return the element.
                    console.log('in search.acronym');
                    return (search.category) ? getCats(element, element.acronym) : element;
                }
                // For definition checkbox
                if (search.definition && searchText && (definitionTerm >= 0 || acronymTerm >= 0)) {
                    console.log('in search.definition');
                    return (search.category) ? getCats(element, element.definition) : element;
                }
                // For id checkbox
                if (search.id && searchText && element.id.indexOf(search.text) !== -1) {
                    console.log('in search.id');
                    return (search.category) ? getCats(element, element.id) : element;
                }
                // No text in the search box, but a category has been selected from the dropdown.
                if (search.category && (typeof(searchText) === "undefined" || searchText === "")) {
                    console.log('in search.category');
                    return getCats(element);
                }
            });
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
