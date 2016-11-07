require("angular");
require("angular-ui-router");
require("angular-messages");
require("angular-sanitize");
require("angular-aria");
require("angular-moment");

window._ = require("lodash");
window.moment = require("moment");


window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
  var errMsg;
  //check the errorObject as IE and FF don't pass it through (yet)
  if (errorObject && errorObject !== undefined) {
    errMsg = errorObject.message;
  }
  else {
    errMsg = errorMsg;
  }
  console.error('Error: ' + errMsg);
};
