'use strict';

angular.module('scratch1App')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'role': 'user',
        'title': 'Home',
        'link': '/'
      },
/*      {
        'role': ['user'],
        'title': 'Classes',
        'link': '/classes'
      },
      {
        'role': ['teacher','student'],
        'title': 'My Classroom',
        'link': '/myclassroom'
      },
/*      {
        'role': ['teacher','student'],
        'title': 'Challenges',
        'link': '/challenges'
      }, */
      {
        'role': 'user',
        'title': 'Heatmap',
        'link': '/nasa/heatmap'
      },
      {
        'role': 'user',
        'title': 'Camera',
        'link': '/nasa'
      },
        {
        'role': ['admin'],
        'title': 'Admin',
        'link': '/admin'
      }

    ];

    $scope.isCollapsed  = true;
    $scope.isLoggedIn   = Auth.isLoggedIn;
    $scope.isAdmin      = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    //check if current role is valid for each menu option
    $scope.isValidRole = function(roles) {
      return true;
      var valid = false;
      var currentRole = Auth.getRole();
      return true;
      //console.log (currentRole);
      if (typeof currentRole === 'undefined') {
        return false;
      }
      if (typeof roles === 'object') {
        for (var i = roles.length - 1; i >= 0; i--) {
          if (roles[i] === currentRole) {
            valid = true;
          }
        }
      } else {
        if (roles === currentRole) {
          valid = true;
        }
      }
      return valid;
    };
  });
