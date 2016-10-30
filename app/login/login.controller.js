/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("LoginController", ["$scope", "$firebaseAuth", "Notification", function ($scope, $firebaseAuth, Notification) {
		$scope.login = {};
		$scope.login.email = "";
		$scope.login.password = "";
		
		$scope.login.submit = function () {
			$firebaseAuth().$signInWithEmailAndPassword($scope.login.email, $scope.login.password)
			.then( function (firebaseUser) {
				Notification.success(JSON.stringify(firebaseUser));
			})
			.catch( function (error) {
				Notification.error(error.message);
			});
		};
	}]);
}());