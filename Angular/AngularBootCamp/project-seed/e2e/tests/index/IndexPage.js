function IndexPage() {
  this.button = element(by.id('button1'));
  this.message = element(by.binding('messageText'));

  this.get = function () {
    browser.get('/#');
  };

  this.clickButton = function () {
    this.button.click();
  };

  this.getTitle = function () {
    return browser.getTitle();
  };

  this.getMessageText = function () {
    return this.message.getText();
  }
}

module.exports = IndexPage;