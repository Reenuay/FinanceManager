/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesAddController", ["$scope", "$state", "$stateParams", "$firebaseArray", "$userData", "Notification", "$error", "$colorList", "$iconList", function ($scope, $state, $stateParams, $firebaseArray, $userData, Notification, $error, $colorList, $iconList) {
		
		/*
			Scope variables.
		*/
		$scope.main = {};
		$scope.main.new = {};
		$scope.main.action = $stateParams.action;
		
		$scope.main.colors = $colorList();
		$scope.main.icons = $iconList();
		
		if ($stateParams.action === "add") {
			$scope.main.new.color = $scope.main.colors[0];
			$scope.main.new.icon = $scope.main.icons[0];
		}
		
		//Load parent category.
		var categories;
		(categories = $firebaseArray($userData().child("categories")))
		.$loaded()
		.then(function () {
			$scope.main.record = categories.$getRecord($stateParams.id);
			if ($scope.main.record) {
				if ($stateParams.action === "edit") {
					$scope.main.new = $scope.main.record;
				} else {
					$scope.main.new.parent = $scope.main.record.$id;
				}
			}
		})
		.catch($error);
		
		$scope.main.SelectColor = function (color) {
			$scope.main.new.color = color;
		};
		
		$scope.main.SelectIcon = function (icon) {
			$scope.main.new.icon = icon;
		};
		
		$scope.main.Submit = function () {
			var name = $scope.main.new.name.toLowerCase(), i;
			if ($stateParams.action === "add") {
				//Check for uniqueness.
				for (i = 0; i < categories.length; i++) {
					if (name === categories[i].name.toLowerCase()) {
						Notification.error("There is already such a category.");
						return;
					}
				}
				
				//Add category.
				categories.$add($scope.main.new)
				.catch($error);
			} else {
				//Check for uniqueness.
				for (i = 0; i < categories.length; i++) {
					if (categories[i] !== $scope.main.new && name === categories[i].name.toLowerCase()) {
						Notification.error("There is already such a category.");
						return;
					}
				}
				
				//Update category.
				categories.$save($scope.main.new)
				.catch($error);
			}
			
			$state.go("main.categories.list");
		};
		
	}]);
}());
