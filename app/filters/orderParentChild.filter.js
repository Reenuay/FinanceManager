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
				Note that there is no checks for cycling in list.
				If some of items are grandparents of themselves it can break your program.
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
				Main function. Makes a recursive sort of array.
			*/
			function RecursiveSort(array, object, sortedArray) {
				var length = array.length;
				for (var i = 0; i < length; i++) {
					if (array[i][parentField] == object[idField]) {
						sortedArray.push(array[i]);
						RecursiveSort(array, array[i], sortedArray);
					}
				}
				return sortedArray;
			}
			
			return RecursiveSort(items, {}, []);
		};
	});
}());
