xdescribe('serviceCache', function() {
  var serviceCache,
    testCacheName = 'test';

  beforeEach(module('tl.util.service-cache'));

  beforeEach(inject(function(_serviceCache_) {
    serviceCache = _serviceCache_;

    serviceCache.create(testCacheName);
  }));

  it('should create a service cache instance', function() {
    expect(serviceCache).toBeDefined();
  });

  it('should allow creation of named cache for a service', function() {
    expect(serviceCache.getCache(testCacheName)).toBeDefined();
  });

  it("should return the newly created cache when create is called", function () {
    var cache = serviceCache.create(testCacheName);
    expect(cache).toBeDefined();
  });

  it('should retrieve the named cache', function() {
    expect(serviceCache.getCache(testCacheName)).toBeDefined();
  });

  it('should be able to store a key/value in the cache', function() {
    var cache = serviceCache.getCache(testCacheName);

    cache.put('test', true);

    expect(cache.get('test')).toBe(true);
  });

  it("should be able to retrieve a value for a specified key", function () {
    var cache = serviceCache.getCache(testCacheName);

    cache.put('test', true);

    expect(cache.get('test')).toBe(true);
  });

  it('should be able to remove a key/value from the cache', function() {
    var cache = serviceCache.getCache(testCacheName);
    cache.put('test', true);

    cache.remove('test');

    expect(cache.get('test')).toBeUndefined();
  });

  it('should be able to delete a named service cache', function() {
    serviceCache.deleteCache(testCacheName);

    expect(serviceCache.getCache(testCacheName)).toBeUndefined()
  });
});