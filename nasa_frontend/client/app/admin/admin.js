'use strict';

angular.module('scratch1App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/nasa/heatmap', {
        templateUrl: 'app/nasa/heatmap.html',
        controller: 'AdminCtrl'
      });
  });
