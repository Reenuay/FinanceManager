/*global angular, firebase*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesController", ["$scope", "$http", "$firebaseArray", "$userData", function ($scope, $http, $firebaseArray, $userData) {
    $scope.categories = {};
		$scope.categories.name = "";
		$scope.categories.list = $firebaseArray($userData().child("categories"));
		
		$scope.categories.add = function () {
			$scope.categories.list.$add({name: $scope.categories.name, icon: $scope.categories.icon});
		};
		
		$scope.categories.remove = function (item) {
			$scope.categories.list.$remove(item);
		};
		
		$scope.icons = [];
		$http.get("font-awesome/list.json").then(function (response) {
			$scope.icons = response.data;
		});
	}]);
}());
