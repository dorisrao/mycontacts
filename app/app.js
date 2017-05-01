'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myContacts', [
  'ngRoute',
  'firebase',
  'myContacts.contacts'
]).
config(['$routeProvider', function($routeProvider) {
  // $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
