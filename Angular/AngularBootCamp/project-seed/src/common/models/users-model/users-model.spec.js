describe('UsersModel', function() {
  var allUsers,
    usersModel,
    $httpBackend,
    baseApiUrl;

  beforeEach(module('ps.models.users'));
  beforeEach(inject(function (_usersModel_, _$httpBackend_, _baseApiUrl_) {
    usersModel = _usersModel_;
    $httpBackend = _$httpBackend_;
    baseApiUrl = _baseApiUrl_;

    setupMocks();
  }));

  it('should create an instance', function () {
    expect(usersModel).toBeDefined();
  });

  describe('getAllUsers', function () {
    it("should load the users", function () {
      usersModel.fetchUsers().then(function (users) {
        expect(users).toEqual(allUsers);
      });
      $httpBackend.flush();
    });
  });

  /**
   * This will setup the mock data for all of the code types.
   *
   * It uses jasmine-jquery to load the data from JSON files
   * in the /data directory.
   *
   */
  function setupMocks() {
    //karma conf files array needs the follow to serve data:
    //{pattern: 'data/**/*.json', watched: true, served: true, included: false}
    jasmine.getJSONFixtures().fixturesPath = 'base/data/users/';
    allUsers = getJSONFixture('default.json');
    $httpBackend.whenGET(baseApiUrl+'/users').respond(allUsers);
  }
});