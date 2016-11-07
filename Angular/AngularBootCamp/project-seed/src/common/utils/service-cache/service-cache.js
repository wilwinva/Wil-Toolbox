angular.module('tl.util.service-cache', [])
  .service('serviceCache', function ServiceCache() {
    var serviceCache = this,
      cachedServices = {};

    function Cache() {
      var cache = this,
        rawCache = {};

      cache.put = function(key, value) {
        rawCache[key] = value;
      };

      cache.get = function(key) {
        return rawCache[key];
      };

      cache.remove = function(key) {
        delete rawCache[key];
      }
    }

    serviceCache.create = function(name) {
      cachedServices[name] = new Cache();

      return cachedServices[name];
    };

    serviceCache.getCache = function(name) {
      return cachedServices[name];
    };

    serviceCache.deleteCache = function(name) {
      delete cachedServices[name];
    }
  })
;