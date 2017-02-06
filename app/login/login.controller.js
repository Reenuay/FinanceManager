/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("LoginController", ["$scope", "$firebaseAuth", "$state", "$error",function ($scope, $firebaseAuth, $state, $error) {
		$scope.login = {};
		$scope.login.email = "";
		$scope.login.password = "";
		
		$scope.login.submit = function () {
			$firebaseAuth().$signInWithEmailAndPassword($scope.login.email, $scope.login.password)
			.then( function (firebaseUser) {
				$state.go("main.categories.list");
			})
			.catch($error);
		};
	}]);
}());
