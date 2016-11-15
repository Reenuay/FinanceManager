/*global angular, firebase*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesController", ["$scope", "$http", "$firebaseArray", "$userData", function ($scope, $http, $firebaseArray, $userData) {
    $scope.categories = {};
		$scope.categories.name = "";
		$scope.categories.list = $firebaseArray($userData().child("categories"));
		$scope.categories.color = "#000";
		
		$scope.categories.add = function () {
			$scope.categories.list.$add({name: $scope.categories.name, icon: $scope.categories.icon, color: $scope.categories.color});
		};
		
		$scope.categories.remove = function (item) {
			$scope.categories.list.$remove(item);
		};
		
		$scope.categories.select = function (index) {
			if ($scope.categories.selected === index) {
				$scope.categories.selected = undefined;
			} else {
				$scope.categories.selected = index;
			}
		};
	}]);
}());
