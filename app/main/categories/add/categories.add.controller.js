/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesAddController", ["$scope", "$stateParams", "$firebaseArray", "$userData", "Notification", "$error", "$colorList", "$iconList", function ($scope, $stateParams, $firebaseArray, $userData, Notification, $error, $colorList, $iconList) {
		
		/*
			Scope variables.
		*/
		$scope.main = {};
		$scope.main.action = $stateParams.action;
		
		$scope.main.colors = $colorList();
		$scope.main.icons = $iconList();
		
		if ($stateParams.action === "add") {
			$scope.main.colors.active = $scope.main.colors[0];
			$scope.main.icons.active = $scope.main.icons[0];
		}
		
		//Load parent category.
		var categories;
		(categories = $firebaseArray($userData().child("categories")))
		.$loaded()
		.then(function () {
			$scope.main.record = categories.$getRecord($stateParams.id);
			if ($scope.main.record) {
				if ($stateParams.action === "edit") {
					$scope.main.colors.active = $scope.main.record.color;
					$scope.main.icons.active = $scope.main.record.icon;
					$scope.main.name = $scope.main.record.name;
				}
			}
		})
		.catch($error);
		
		$scope.main.SelectColor = function (color) {
			$scope.main.colors.active = color;
		};
		
		$scope.main.SelectIcon = function (icon) {
			$scope.main.icons.active = icon;
		};
	}]);
}());
