'use strict';

angular.module('dockerchatdemoApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });
  });
