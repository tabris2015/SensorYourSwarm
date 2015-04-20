'use strict';

angular.module('scratch1App')
  console.log ("nasaxxx");

  .config(function ($routeProvider) {
    $routeProvider
      .when('/nasa', {
        templateUrl: 'app/nasa/main.html',
        controller: 'NasaCtrl'
      });
  });
