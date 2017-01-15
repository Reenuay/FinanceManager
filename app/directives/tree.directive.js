/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.directive("tree", function($compile) {
		return {
				restrict: "E",
				scope: {node: "="},
				template:
						"<span class='{{ node.icon }}'></span> " +
						"{{ node.name }}" +
						"<ul>" + 
								"<li ng-repeat='child in node.children'>" + 
										"<tree node='child'></tree>" +
								"</li>" +
						"</ul>",
				compile: function(tElement, tAttr) {
						var contents = tElement.contents().remove();
						var compiledContents;
						return function(scope, iElement, iAttr) {
								if(!compiledContents) {
										compiledContents = $compile(contents);
								}
								compiledContents(scope, function(clone, scope) {
												 iElement.append(clone); 
								});
						};
				}
		};
	});
}());
