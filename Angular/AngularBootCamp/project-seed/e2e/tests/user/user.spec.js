describe('user-list', function() {
  beforeEach(function() {
    browser.get('/#/users')
  })

  it('should have a link', function() {
    var link = element(by.repeater('user in userList.users').row(0)).$('a');

    link.click();

    expect(browser.getLocationAbsUrl()).toBe('/users/angular')
  })
});