/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("LoginController", ["$scope", "$firebaseAuth", "Notification", "$state", function ($scope, $firebaseAuth, Notification, $state) {
		$scope.login = {};
		$scope.login.email = "";
		$scope.login.password = "";
		
		$scope.login.submit = function () {
			$firebaseAuth().$signInWithEmailAndPassword($scope.login.email, $scope.login.password)
			.then( function (firebaseUser) {
				$state.go("main.categories");
			})
			.catch( function (error) {
				Notification.error(error.message);
			});
		};
	}]);
}());
