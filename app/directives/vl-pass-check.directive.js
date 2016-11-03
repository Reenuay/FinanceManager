/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.directive('vlPassCheck', function (defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then( function (errorMessages) {
      errorMessages.vlPassCheck = "Passwords don't match";
    });
    return {
      restrict: "A",
      require: "ngModel",
			scope: {
				vlPassCheck: "=vlPassCheck"
			},
      link: function(scope, element, attributes, ngModel) {
				if (!ngModel) return;
				
        ngModel.$validators.vlPassCheck = function(modelValue) {
          return scope.vlPassCheck == modelValue;
        };
  
        scope.$watch("vlPassCheck", function () {
          ngModel.$validate();
        });
      }
    };
  });
}());
