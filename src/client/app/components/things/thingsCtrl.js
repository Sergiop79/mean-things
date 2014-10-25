(function () {
  'use strict';

  function thingsCtrl($http) {
    var vm = this;
    var socket = io();

    vm.things = [];
    vm.input = '';

    vm.getThings = function () {
      $http.get('/api/things')
        .success(function (data) {
          vm.things = data;
        });
    };

    vm.deleteThing = function (_id) {
      $http.delete('/api/things/' + _id)
        .success(function () {
          vm.getThings();
          socket.emit('submit');
        });
    };

    vm.postThing = function (thing) {
      $http.post('/api/things', thing)
        .success(vm.getThings);
    };

    vm.submit = function (input) {
      if (input) {
        $http.post('/api/things', {
          name: input
        })
          .success(function () {
            vm.input = '';
            vm.getThings();
            socket.emit('submit');
          });
      }
    };

    vm.getThings();

    socket.on('update', function () {
      vm.getThings();
    });

  }

  angular.module('thingsApp')
    .controller('ThingsCtrl', thingsCtrl);
}());
