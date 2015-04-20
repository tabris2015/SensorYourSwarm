'use strict';

angular.module('scratch1App')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          id:    $scope.user.id,
          password: $scope.user.password
        })
        .then( function(data) {
          // Logged in, redirect to home
          switch (data.role) {
            case 'student':
            case 'teacher':
              //$location.path('/myclassroom');
              $window.location.href = '/myclassroom';
              break;
            case 'admin':
              $location.path('/admin');
              break;
            default:
              $location.path('/');
          }
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
