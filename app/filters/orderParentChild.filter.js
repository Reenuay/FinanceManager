/*
	This filter is for parent-child sorting.
	The main idea is that we have an array of objects.
	Each of them has an id parameter and parent parameter.
	Id must be always provided. Parent can be undefined or id of one another category.
	User must provide two parameters: one for id field name and one for parent field name.
	(User decides what names he will give to that parameters ib objects)
	Filter sorts objects in array in that way so every child comes after its parent.
	This will give to an array a tree-like seeming for further use.
*/
/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.filter("orderParentChild", function () {
		return function (items, idField, parentField) {
			/*
				Necessary checks.
			*/
			if (!Array.isArray(items) ||//Must be an array.
					items.length < 2 ||//Must have a length more than 1.
					typeof idField !== "string" ||//Must be a string.
					typeof parentField !== "string" ||//Must be a string.
					items.some(function (element, index, array) {
						return typeof element !== "object" || (typeof element[idField] !== "string" && typeof element[idField] !== "number");
					})//Each must be and object with 'idField' field with string or number type.
				 )
				return items;
			
			/*
				Helper functions.
			*/
			//Returns the count of parents of given item.
			function ParentCount(list, item) {
				//Using here "==" operator instead of "===" because "idField" and "parentField" fields can be either string or number.
				if (item[idField] == item[parentField])
					return 0;
				//Get the parent of given item.
				var parent = GetItem(list, item[parentField]);
				//If parent exists look for its parent.
				return parent ? 1 + ParentCount(list, parent) : 0;
			}

			//Returns the item from list according to its id(can be string or number).
			function GetItem(list, id) {
				//Find out an item with given id in list.
				for (var i = 0; i < list.length; i++) {
					//Using here "==" operator instead of "===" because id can be either string or number.
					if (list[i][idField] == id)
						return list[i];
				}
				return undefined;
			}
			
			/*
				Main logics.
			*/
			//Sort items by their levels.
			items.sort(function (a, b) {
				return 0;
				var _a = ParentCount(items, a),
						_b = ParentCount(items, b);
				return (_a > _b) - (_a < _b);
			});
			
			return items;
		};
	});
}());
