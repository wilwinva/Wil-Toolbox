'use strict';

describe('Controller: SearchResultsCtrl - Search Sandia Web, CPS, and Filenet', function () {
  var SearchResultsCtrl,
    scope,
    mockedResults,
    mockedAtls,
    mockedAtlSapleResults,
    searchTerm = 'weatherby',
    searchType = 'web',
    pageBegin = 0,
    numResults = 76,
    CONFIG = {numSearchResults: 25},
    currentPage = 1,
    resourceType = null
    ;

  // load the controller's and mock's modules
  beforeEach(module('searchResultsApp', 'mockedSearchResults', 'mockedVacationAtlResults', 'mockedSapleAtlResults'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, RESULTS, ATLS, SAPLE) {
    scope = $rootScope.$new();
    mockedResults = RESULTS;
    mockedAtls = ATLS;
    mockedAtlSapleResults = SAPLE;
    SearchResultsCtrl = $controller('SearchResultsCtrl', {
      $scope: scope,
      results: mockedResults,
      atls: mockedAtls,
      saple: mockedAtlSapleResults,
      queryTerm: searchTerm,
      queryType: searchType,
      pageBegin: pageBegin,
      numResults: mockedResults.count,
      CONFIG: CONFIG,
      currentPage: currentPage,
      resourceType: resourceType,
      admin: false
      // place here mocked dependencies
    });
  }));

  it('Search Results searchTerm', function () {
    expect(SearchResultsCtrl.searchTerm).toBe(searchTerm);
  });
  it('Search Results searchType', function () {
    expect(SearchResultsCtrl.searchType).toBe(searchType);
  });
  it('Search Results pageBegin', function () {
    expect(SearchResultsCtrl.pageBegin).toBe(pageBegin + 1);
  });
  it('Search Results numResults', function () {
    expect(parseInt(SearchResultsCtrl.numResults, 10)).toBe(numResults);
  });
  it('Search Results numSearchResults', function () {
    expect(SearchResultsCtrl.numSearchResults).toBe(CONFIG.numSearchResults);
  });
  it('Search Results currentPage', function () {
    expect(SearchResultsCtrl.currentPage).toBe(currentPage);
  });


  it('Search Results count != 0', function () {
    expect(SearchResultsCtrl.searchResultsContent.count).not.toBe('0');
  });
  it('Search Result should have a link', function () {
    expect(SearchResultsCtrl.searchResultsContent.content[0].link).not.toBe(null);
  });
  it('Search Result should have a title', function () {
    expect(SearchResultsCtrl.searchResultsContent.content[0].title).not.toBe(null);
  });
  it('Search Result should have a description', function () {
    expect(SearchResultsCtrl.searchResultsContent.content[0].description).not.toBe(null);
  });
  it('Search Result should have a url', function () {
    expect(SearchResultsCtrl.searchResultsContent.content[0].url).not.toBe(null);
  });
  it('atls Results count != 0', function () {
    expect(SearchResultsCtrl.atls.length).not.toBe(0);
  });
  it('atlSapleContent Results count != 0', function () {
    expect(SearchResultsCtrl.atlSapleContent.totalResults).not.toBe(100);
  });
});

describe('Controller: SearchResultsCtrl - Search Technical Library', function () {
  var SearchResultsCtrl,
    scope,
    mockedResults,
    mockedAtls = null,
    mockedAtlSapleResults = null,
    searchTerm = 'weatherby',
    searchType = 'techlib',
    pageBegin = 0,
    numResults = 70,
    CONFIG = {numSearchResults: 25},
    currentPage = 1,
    resourceType = 'All Items'
    ;

  // load the controller's module
  beforeEach(module('searchResultsApp', 'mockedTechlibResults'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, RESULTS) {
    scope = $rootScope.$new();
    mockedResults = RESULTS;
    mockedAtls = null;
    mockedAtlSapleResults = null;
    SearchResultsCtrl = $controller('SearchResultsCtrl', {
      $scope: scope,
      results: mockedResults,
      atls: mockedAtls,
      saple: mockedAtlSapleResults,
      queryTerm: searchTerm,
      queryType: searchType,
      pageBegin: pageBegin,
      numResults: mockedResults.count,
      CONFIG: CONFIG,
      currentPage: currentPage,
      resourceType: resourceType,
      admin: false
      // place here mocked dependencies
    });
  }));

  it('Techlib Search Results searchTerm', function () {
    expect(SearchResultsCtrl.searchTerm).toBe(searchTerm);
  });
  it('Techlib Search Results searchType', function () {
    expect(SearchResultsCtrl.searchType).toBe(searchType);
  });
  it('Techlib Search Results pageBegin', function () {
    expect(SearchResultsCtrl.pageBegin).toBe(pageBegin + 1);
  });
  it('Techlib Search Results numResults', function () {
    expect(parseInt(SearchResultsCtrl.numResults, 10)).toBe(numResults);
  });
  it('Techlib Search Results numSearchResults', function () {
    expect(SearchResultsCtrl.numSearchResults).toBe(CONFIG.numSearchResults);
  });
  it('Techlib Search Results currentPage', function () {
    expect(SearchResultsCtrl.currentPage).toBe(currentPage);
  });

  it('Techlib Search Results count != 0', function () {
    expect(SearchResultsCtrl.searchResultsContent.count).not.toBe('0');
  });
  it('Techlib Search Result should have a link', function () {
    expect(SearchResultsCtrl.searchResultsContent.content[0].link).not.toBe(null);
  });
  it('Techlib Search Result should have a title', function () {
    expect(SearchResultsCtrl.searchResultsContent.content[0].title).not.toBe(null);
  });
  it('Techlib Search Result should have a image', function () {
    expect(SearchResultsCtrl.searchResultsContent.content[0].image).not.toBe(null);
  });
  it('Techlib Search Result should have a type', function () {
    expect(SearchResultsCtrl.searchResultsContent.content[0].type).not.toBe(null);
  });
  it('Techlib Search Result should have a callNo', function () {
    expect(SearchResultsCtrl.searchResultsContent.content[0].callNo).not.toBe(null);
  });
  it('Techlib Search Result should have a publish date', function () {
    expect(SearchResultsCtrl.searchResultsContent.content[0].pubDate).not.toBe(null);
  });
  it('Techlib atls Results count == 0', function () {
    expect(SearchResultsCtrl.atls).toBe(mockedAtls);
  });
  it('Techlib atlSapleContent Results count == 0', function () {
    expect(SearchResultsCtrl.atlSapleContent).toBe(mockedAtlSapleResults);
  });
});
