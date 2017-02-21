/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("MainController", ["$scope", function ($scope) {
		$scope.navbar = {};
		$scope.navbar.collapsed = false;
		$scope.navbar.links = [
			{name: "Categories", sref: "main.categories.list", icon: "glyphicon glyphicon-tag"}
		];
	}]);
}());
