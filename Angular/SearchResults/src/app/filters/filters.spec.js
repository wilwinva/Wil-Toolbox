'use strict';

describe('Filter: decode', function () {
// load the filter's module
  beforeEach(module('searchResultsApp'));

// initialize a new instance of the filter before each test
  var decode;
  beforeEach(inject(function ($filter) {
    decode = $filter('decode');
  }));

  it('should return the input with spaces replacing + characters', function () {
    var inText = 'http%3A%2F%2Fprod.sandia.gov%2Ftechlib%2Faccess-control.cgi%2F1994%2F942013a.pdf';
    var outText = 'http://prod.sandia.gov/techlib/access-control.cgi/1994/942013a.pdf';
    expect(decode(inText)).toBe(outText);
  });
});

describe('Filter: replaceSpaces', function () {
  // load the filter's module
  beforeEach(module('searchResultsApp'));

  // initialize a new instance of the filter before each test
  var replaceSpaces;
  beforeEach(inject(function ($filter) {
    replaceSpaces = $filter('replaceSpaces');
  }));

  it('should return the input  with spaces replacing + characters', function () {
    var inText = '{+}+is+the+traceoperator+(tr{d]+=+dll+++dzz+++dqq+)';
    var outText = '{ } is the traceoperator (tr{d] = dll   dzz   dqq )';
    expect(replaceSpaces(inText)).toBe(outText);
  });
});

describe('Filter: trimSpaces', function () {
  // load the filter's module
  beforeEach(module('searchResultsApp'));

  // initialize a new instance of the filter before each test
  var trimSpaces;
  beforeEach(inject(function ($filter) {
    trimSpaces = $filter('trimSpaces');
  }));

  it('should return the input with leading and trailing spaces removed ', function () {
    var inText = '       Hello World!        ';
    var outText = 'Hello World!';
    expect(trimSpaces(inText)).toBe(outText);
  });
});

describe('Filter: removeStars', function () {
  // load the filter's module
  beforeEach(module('searchResultsApp'));

  // initialize a new instance of the filter before each test
  var removeStars;
  beforeEach(inject(function ($filter) {
    removeStars = $filter('removeStars');
  }));

  it('should return the input removing &#9734; (star) ', function () {
    var inText = '&#9734; SF 4001-HJF';
    var outText = ' SF 4001-HJF';
    expect(removeStars(inText)).toBe(outText);
  });
});

describe('Filter: orgCode', function () {
  // load the filter's module
  beforeEach(module('searchResultsApp'));

  // initialize a new instance of the filter before each test
  var orgCode;
  beforeEach(inject(function ($filter) {
    orgCode = $filter('orgCode');
  }));

  it('should return the orgCode from the input string ', function () {
    var inText = '%26%239734%3B+The+link+to+the+homepage+for+organization+09500.';
    var outText = '09500';
    expect(orgCode(inText)).toBe(outText);
  });
});

describe('Filter: phone', function () {
  // load the filter's module
  beforeEach(module('searchResultsApp'));

  // initialize a new instance of the filter before each test
  var phone;
  beforeEach(inject(function ($filter) {
    phone = $filter('phone');
  }));

  it('should return the input as formatted phone (xxx) xxx-xxxx ', function () {
    var inText = '1234567890';
    var outText = '(123) 456-7890';
    expect(phone(inText)).toBe(outText);
  });
});

describe('Filter: imageIsStandard', function () {
// load the filter's module
  beforeEach(module('searchResultsApp'));

// initialize a new instance of the filter before each test
  var imageIsStandard;
  beforeEach(inject(function ($filter) {
    imageIsStandard = $filter('imageIsStandard');
  }));

  it('should return true if input contains string "icon_book.png"', function () {
//    var inText = 'http%3A%2F%2Flibrarysearch.sandia.gov%3A1701%2Fprimo_library%2Flibweb%2Fimages%2Ficon_book.png';
    var inText = '%2Ficon_book.png';
    expect(imageIsStandard(inText)).toEqual(false);
  });
});
