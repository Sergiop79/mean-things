describe('Things component', function () {
  describe('ThingsCtrl', function () {
    var $rootScope;
    var $scope;
    var createController;
    var $httpBackend;
    var handleGET;
    var handleDELETE;
    var handlePOST;

    var data = [{
        "_id": "54400344d3d45f7f48ff03ec",
        "name": "Post another thing"
      }, {
        "_id": "5440037cd3d45f7f48ff03ee",
        "name": "Get one thing"
      }, {
        "_id": "5440046b82d76b85783f010f",
        "name": "Get one thing"
      }, {
        "_id": "544005777ea48729118a5dcc",
        "name": "Get one thing"
      }];

    var data2 = [{
        "_id": "5440037cd3d45f7f48ff03ee",
        "name": "Get one thing"
      }, {
        "_id": "5440046b82d76b85783f010f",
        "name": "Get one thing"
      }, {
        "_id": "544005777ea48729118a5dcc",
        "name": "Get one thing"
      }];
       var data3 = [{
        "_id": "54400344d3d45f7f48ff03ec",
        "name": "one more thing"
      }, {
        "_id": "54400344d3d45f7f48ff03ec",
        "name": "Post another thing"
      }, {
        "_id": "5440037cd3d45f7f48ff03ee",
        "name": "Get one thing"
      }, {
        "_id": "5440046b82d76b85783f010f",
        "name": "Get one thing"
      }, {
        "_id": "544005777ea48729118a5dcc",
        "name": "Get one thing"
      }];

    beforeEach(module('thingsApp'));

    beforeEach(inject(function ($rootScope, $injector, $controller) {
      $scope = $rootScope.$new();
      $httpBackend = $injector.get('$httpBackend');

      // Fake Backend

      handleGET = $httpBackend.when('GET', '/api/things').respond(data);

      handleDELETE = $httpBackend.when('DELETE', '/api/things/54400344d3d45f7f48ff03ec').respond();
      handlePOST = $httpBackend.when('POST', '/api/things').respond();

      createController = function () {
        $controller('ThingsCtrl as vm', {
          $scope: $scope
        });
      }
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it('should fetch a list of things', function () {
      handleGET.respond(data);
      $httpBackend.expectGET('/api/things');
      createController();
      $scope.vm.getThings();
      $httpBackend.flush();

      expect($scope.vm.things).toEqual(data);
    });

    it('should delete one thing by _id and then fetch a list of things', function () {
      handleGET.respond(data2);
      $httpBackend.expectDELETE('/api/things/54400344d3d45f7f48ff03ec');
      createController();
      $scope.vm.deleteThing('54400344d3d45f7f48ff03ec');
      $httpBackend.flush();
      expect($scope.vm.things).toEqual(data2);
    });

    it('should post one more thing and then fetch a list of things', function () {
      handleGET.respond(data3);
      $httpBackend.expectPOST('/api/things', {'name': 'one more thing'});
      createController();
      $scope.vm.postThing({name: 'one more thing'});
      $httpBackend.flush();
      expect($scope.vm.things).toEqual(data3);
    });

    it('should submit the input with a thing and then fetch a list of things', function () {
      handlePOST.respond();
      handleGET.respond(data);
      createController();
      $scope.vm.input ='something to  submit';
      var input = $scope.vm.input;
      $httpBackend.expectPOST('/api/things', {'name': input});
      $scope.vm.submit(input);
      $httpBackend.flush();
      expect($scope.vm.things.length).toBe(4);
    });

  });

});
