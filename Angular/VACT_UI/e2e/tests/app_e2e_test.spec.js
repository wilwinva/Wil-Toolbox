/**
 * Created by awshwer on 10/28/2015.
 */
'use strict';


describe('The Main Page', function() {

  beforeEach(function() {
    browser.get('#/');
  });

  it('should load the page', function() {
    expect(element(by.css('.headingGroup')).isPresent()).toBe(false);
  });
  it('should load the page', function () {
    expect(element(by.id('searchInput')).isPresent()).toBe(true);
  });
});

describe('Test Search Input - SEARCH BUTTON', function(){
  var textBoxInput;
  beforeEach(function(){
    textBoxInput = element(by.id('searchInput'));
  });

  /*search button tests*/
  xit('should query on a building number - search button', function () {
    textBoxInput.sendKeys('804');
    var button = element(by.id('searchButton'));
    button.click().then(function(){
      browser.waitForAngular();
      //expect(element(by.id('maps')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  xit('should query on an org number - search button', function () {
    textBoxInput.sendKeys('9537');
    var button = element(by.id('searchButton'));
    button.click().then(function(){
      //browser.waitForAngular();
      expect(element(by.id('orgAbove')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on memory book - search button', function () {
    textBoxInput.sendKeys('memory book');
    var button = element(by.id('searchButton'));
    button.click().then(function(){
      //browser.waitForAngular();
      expect(element(by.css('#searchAtlWrapper > div > div:nth-child(1) > atl-content-right > div > ng-include > div > div > a')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on a name - search button', function () {
    textBoxInput.sendKeys('adam shwert');
    var button = element(by.id('searchButton'));
    button.click().then(function(){
      browser.waitForAngular();
      expect(element(by.id('people')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });
});

describe('Test Search Input - WEB LINK', function(){
  var textBoxInput;
  beforeEach(function(){
    textBoxInput = element(by.id('searchInput'));
  });

  /*web link tests*/
  it('should query on a building number - web link', function () {
    textBoxInput.sendKeys('804');
    var link = element(by.id('webLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('maps')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on an org number - web link', function () {
    textBoxInput.sendKeys('9537');
    var link = element(by.id('webLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('orgAbove')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on memory book - web link', function () {
    textBoxInput.sendKeys('memory book');
    var link = element(by.id('webLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.css('.searchLink')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on a name - web link', function () {
    textBoxInput.sendKeys('william weatherby');
    var link = element(by.id('webLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('people')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

});

describe('Test Search Input - CPS LINK', function(){
  var textBoxInput;
  beforeEach(function(){
    textBoxInput = element(by.id('searchInput'));
  });

  /*Policy link tests*/
  it('should query on a building number - cps link', function () {
    textBoxInput.sendKeys('804');
    var link = element(by.id('cpsLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('noResultsFound')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on an org number - cps link', function () {
    textBoxInput.sendKeys('9537');
    var link = element(by.id('cpsLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('noResultsFound')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on memory book - cps link', function () {
    textBoxInput.sendKeys('memory book');
    var link = element(by.id('cpsLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on a name - cps link', function () {
    textBoxInput.sendKeys('adam shwert');
    var link = element(by.id('cpsLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });
});

describe('Test Search Input - TECHLIB LINK', function () {
  var textBoxInput;
  beforeEach(function(){
    textBoxInput = element(by.id('searchInput'));
  });

  /*Technical Library link tests*/
  it('should query on a building number 880 loop 1- techlib link', function () {
    textBoxInput.sendKeys('880');
    var link = element(by.id('techLibLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
//      expect(element(by.css('.nav.nav-stacked')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on a building number 880 loop 2- techlib link', function () {
    textBoxInput.sendKeys('880');
    var link = element(by.id('techLibLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      expect(element(by.css('.nav.nav-stacked')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on an org number 9537 - techlib link', function () {
    textBoxInput.sendKeys('9537');
    var link = element(by.id('techLibLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      expect(element(by.css('.nav.nav-stacked')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on memory book - techlib link', function () {
    textBoxInput.sendKeys('memory book');
    var link = element(by.id('techLibLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      expect(element(by.css('.nav.nav-stacked')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on a name lisa kegler- techlib link', function () {
    textBoxInput.sendKeys('lisa kegler');
    var link = element(by.id('techLibLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      expect(element(by.css('.nav.nav-stacked')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });
});

describe('Test Search Input - FILENET LINK', function(){
  var textBoxInput;
  beforeEach(function(){
    textBoxInput = element(by.id('searchInput'));
  });
   /!*filenet link tests*!/
  it('should query on a building number - filenet link', function () {
    textBoxInput.sendKeys('804');
    var link = element(by.id('filenetLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on an org number - filenet link', function () {
    textBoxInput.sendKeys('9537');
    var link = element(by.id('filenetLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on memory book - filenet link', function () {
    textBoxInput.sendKeys('memory book');
    var link = element(by.id('filenetLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on a name - filenet link', function () {
    textBoxInput.sendKeys('adam shwert');
    var link = element(by.id('filenetLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });
});

describe('TECHLIB LINK AND SUB LINKS - TECHLIB LINK', function () {
  var textBoxInput;
  beforeEach(function(){
    textBoxInput = element(by.id('searchInput'));
    textBoxInput.sendKeys('security');
  });

  /*Technical Library link tests*/
  it('should query on a security - techlib link', function () {
    var link = element(by.id('techLibLink'));
    link.click().then(function () {
      expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
      expect(element(by.css('.nav.nav-stacked')).isPresent()).toBe(true);

/*
 element.all(by.css('.nav.nav-stacked li a')).each(function(element, index) {
 var myText = element.getText();
 element.getOuterHtml().then(function(text) {
 console.log(text);
        });
 textBoxInput.sendKeys(myText);
 browser.pause();
 testLink(element);
      });
 */
//      describe('TECHLIB LINK SUB LINK - TECHLIB LINK - subLink resourceTypeJournals', function () {
//        it('should query on a security - techlib link - subLink', function () {
      testLink(element(by.css('.nav.nav-stacked li a.resourceTypeJournals')));
//        });
//      });
      testLink(element(by.css('.nav.nav-stacked li a.resourceTypeArticles')));
      testLink(element(by.css('.nav.nav-stacked li a.resourceTypeDatabases')));
      testLink(element(by.css('.nav.nav-stacked li a.resourceTypeReports')));
      testLink(element(by.css('.nav.nav-stacked li a.resourceTypeBooks')));
      testLink(element(by.css('.nav.nav-stacked li a.resourceTypeAll')));

      textBoxInput.clear();
    });
  });
});

/*atl tests - atls only show for web searches*/
describe('Test Search Input - WEB LINK', function(){
  var textBoxInput;
  beforeEach(function(){
    textBoxInput = element(by.id('searchInput'));
  });

  /*web link tests*/
  it('should query on a building number - web link', function () {
    textBoxInput.sendKeys('804');
    var link = element(by.id('webLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('maps')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on an org number - web link', function () {
    textBoxInput.sendKeys('9537');
    var link = element(by.id('webLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('orgAbove')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on memory book - web link', function () {
    textBoxInput.sendKeys('memory book');
    var link = element(by.id('webLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.css('.searchLink')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

  it('should query on a name - web link', function () {
    textBoxInput.sendKeys('william weatherby');
    var link = element(by.id('webLink'));
    link.click().then(function () {
      browser.waitForAngular();
      expect(element(by.id('people')).isPresent()).toBe(true);
      textBoxInput.clear();
    });
  });

});



function testLink(subLink) {
  subLink.click().then(function () {
    browser.waitForAngular();
    expect(element(by.id('searchListWrapper')).isPresent()).toBe(true);
    var myParent = getParent(subLink);
    expect(hasClass(myParent, 'active')).toBe(true);
  });
}

var hasClass = function (element, cls) {
  return element.getAttribute('class').then(function (classes) {
    return classes.split(' ').indexOf(cls) !== -1;
  });
};
var getParent = function (theElement) {
  return theElement.element(by.xpath('..'));
};
