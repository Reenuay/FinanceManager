/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("LoginController", ["$scope", "$firebaseAuth", function ($scope, $firebaseAuth) {
		$scope.login = {};
		$scope.login.email = "";
		$scope.login.password = "";
		
		$scope.login.submit = function () {
			$firebaseAuth().$signInWithEmailAndPassword($scope.login.email, $scope.login.password)
			.then( function(firebaseUser) {
				alert(JSON.stringify(firebaseUser));
			})
			.catch( function(error) {
				alert(error.message);
			});
		};
	}]);
}());
