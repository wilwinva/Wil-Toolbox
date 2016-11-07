describe('UserListCtrl', function() {
  var userListCtrl,
    usersModel;

  beforeEach(module('ps.user-list'));
  beforeEach(inject(function($controller) {
    setupMocks();

    userListCtrl = $controller('UserListCtrl', {
      usersModel: usersModel
    });
  }));

  it('should create a valid instance', function() {
    expect(userListCtrl).toBeDefined();
  });

  it('should call fetchUsers when instantiated', function() {
    expect(usersModel.fetchUsersWasCalled).toBe(true);
  });

  it("should set the userList.users property when fetchUsers is called", function () {
    expect(userListCtrl.users).toBeDefined();
  });

  function setupMocks() {
    usersModel = {
      fetchUsersWasCalled: false,
      fetchUsers: function () {
        this.fetchUsersWasCalled = true;
        return {
          then: function (callback) {
            callback([]);
          }
        }
      }
    }
  }
});