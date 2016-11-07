function toDate() {
  return function (stringDate) {
    return moment(stringDate)._d
  }
}

function toFormattedDate() {
  return function (stringDate, format) {
    format = format || 'MM/DD/YY';
    return moment(stringDate).format(format)
  }
}

angular.module('project-seed.filters.dates', [])
  .filter('toDate', toDate)
  .filter('toFormattedDate', toFormattedDate)
;
