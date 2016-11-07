/**
 * Created by awshwer on 10/28/2015.
 */
'use strict';


function actualTests() {

    it('should load the page', function () {
        expect(element(by.css('.headingGroup')).isPresent()).toBe(true);
    });

    /**********ComputersByOrg***********/
        // look for the ComputersByOrg Portlet div (by element id)
    it('should find the Computers By Org Portlet', function () {
        expect(element(by.css('#computersByOrg')).isPresent()).toBe(true);
    });

    // look for some content in the ComputersByOrg Portlet... (td in a data row)
    //it('should find CONTENT Computers By Org Portlet', function () {
    //    expect(element(by.css('#computerResults > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)')).isPresent()).toBe(true);
    //})

    // look for some content in the ComputersByOrg Portlet... (td in a data row)
    it('should find CONTENT Computers By Org Portlet', function () {
        expect(element(by.css('#computerResults > table td')).isPresent()).toBe(true);
    });
}

function pageHasHamburger(state) {

    // look for hamburger
    it('should find Hamburger above Portlets (conditionally)', function () {
        expect(element(by.css('.navbar-toggle')).isDisplayed()).toBe(state);

    });
}


describe('The Main Page - Medium Screen', function () {
    beforeEach(function () {
        browser.manage().window().setSize(1024, 768);     // medium size screen
        browser.get('#/');
        browser.waitForAngular();
    });

    pageHasHamburger(false);
    actualTests();
});

describe('The Main Page - Small Screen', function () {

    beforeEach(function () {
        browser.manage().window().setSize(375, 627);     // small size screen
        browser.get('#/');
        browser.waitForAngular();
    });

    pageHasHamburger(true);
    actualTests();
});
