/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesListController", ["$scope", "$firebaseArray", "$userData", "Notification", "$state",  function ($scope, $firebaseArray, $userData, Notification, $state) {
		
		/*
			Scope variables.
		*/
		$scope.main = {};
		//Disabled state for edit/delete buttons.
		$scope.main.disabled = true;
		$scope.main.searchValue = "";
		//'$id' for true and '' for false. Used for many logics in template.
		//For example, for hiding plus and minus signs, parent-child ordering and so on.
		$scope.main.viewMode = "$id";
		//can be '-name', '', '+name'. Used for name ordering.
		$scope.main.listOrder = "";
		//Functions for expanding and collapsing one or more item.
		$scope.main.ItemExpand = function (item) {
			item.open = true;
		};
		$scope.main.ItemCollapse = function (item) {
			delete item.open;
		};
		$scope.main.ItemExpandAll = function () {
			$scope.categories.forEach(function (element, index, array) {
				element.open = true;
			});
		};
		$scope.main.ItemCollapseAll = function () {
			$scope.categories.forEach(function (element, index, array) {
				delete element.open;
			});
		};
		//Selects a category.
		$scope.main.Select = function (item) {
			if ($scope.main.selected !== item) {
				$scope.main.selected = item;
				$scope.main.disabled = false;
			}	else {
				delete $scope.main.selected;
				$scope.main.disabled = true;
			}
		};
		$scope.main.Add = function (params) {
			$state.go("main.categories.add", params);
		};
		
		/*
			Functions for template purposes.
		*/
		//Loads data from firebase.
		//main.loaded can be undefined, false or true. If undefined response is not received. If false there is  some errors. If true everything is ok.
		$scope.LoadCategories = function () {
			delete $scope.main.loaded;
			($scope.categories = $firebaseArray($userData().child("categories")))
			.$loaded()
			.then(function () {
				$scope.main.loaded = true;
			})
			.catch(function (error) {
				Notification.error(error.message);
				$scope.main.loaded = false;
			});
		};
		$scope.LoadCategories();
		
		//Extends catgeories fields to further use in template.
		$scope.ExtendFields = function (list) {
			//Add an additional data to categories.
			list.forEach(function (element, index, array) {
				//Used to add padding in category rendering.
				element.level = ParentCount(list, element);
				//Used to hide plus signs.
				element.childrenCount = ChildrenCount(array, element.$id);
			});
			return list;
		};
		
		/*
			Helper functions.
		*/
		//Returns the count of parents of given item.
		function ParentCount(list, item) {
			//Using here "==" operator instead of "===" because $id can be either string or number.
			if (item.$id == item.parent)
				return 0;
			//Get the parent of given item.
			var parent = GetItem(list, item.parent);
			//If parent exists look for its parent.
			return parent ? 1 + ParentCount(list, parent) : 0;
		}
		
		//Returns the count of children of object with current id.
		function ChildrenCount(list, id) {
			var res = 0;
			for (var i = 0; i < list.length; i++) {
				//Count childrens.
				res += list[i].parent == id;
			}
			return res;
		}
		
		//Returns the item from list according to its id(can be string or number).
		function GetItem(list, id) {
			if (id === undefined)
				return undefined;
			//Find out an item with given id in list.
			for (var i = 0; i < list.length; i++) {
				//Using here "==" operator instead of "===" because id and $id can be either string or number.
				if (list[i].$id == id)
					return list[i];
			}
			return undefined;
		}
	}]);
}());
