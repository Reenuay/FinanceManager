/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesAddController", ["$scope", "$state", "$stateParams", "$categories", "Notification", "$error", "$colorList", "$iconList", function ($scope, $state, $stateParams, $categories, Notification, $error, $colorList, $iconList) {
		
		/*
			Scope variables.
		*/
		$scope.main = {};
		$scope.main.action = $stateParams.action;
		
		$scope.main.colors = $colorList;
		$scope.main.icons = $iconList;
		$scope.main.name = "";
		$scope.main.color = $scope.main.colors[0];
		$scope.main.icon = $scope.main.icons[0];
		
		//Load parent category.
		$categories
		.$loaded()
		.then(function () {
			$scope.main.record = $categories.$getRecord($stateParams.id);
			if ($stateParams.action === "edit") {
				$scope.main.name = $scope.main.record.name;
				$scope.main.color = $scope.main.record.color;
				$scope.main.icon = $scope.main.record.icon;
			}
		});
		
		$scope.main.SelectColor = function (color) {
			$scope.main.color = color;
		};
		
		$scope.main.SelectIcon = function (icon) {
			$scope.main.icon = icon;
		};
		
		$scope.main.Submit = function () {
			var r = (
				$stateParams.action === "add" ?
				$categories.Add({
					name: $scope.main.name,
					icon: $scope.main.icon,
					color: $scope.main.color,
					parent: $scope.main.record.$id
				}) :
				$categories.Update($scope.main.record.$id, {
					name: $scope.main.name,
					icon: $scope.main.icon,
					color: $scope.main.color
				})
			);
			if (r)
				r.then(function () {
					$state.go("main.categories.list");
				});
		};
		
	}]);
}());
