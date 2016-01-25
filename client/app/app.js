'use strict';

angular.module('dockerchatdemoApp', [
  'dockerchatdemoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngMaterial'
  ])
.config(function($routeProvider, $locationProvider,$mdIconProvider) {
    $routeProvider
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

    //$mdIconProvider.fontSet('fa', 'fontawesome');
});