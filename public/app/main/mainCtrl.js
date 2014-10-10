'use strict';

app.controller('MainCtrl', function($scope, $document, $location, identity){
    if (identity.isAuthenticated()) {
        $location.path('/products');
    }
    $scope.scrollToLearn = function() {
        var duration = 500;
        var offset = 30;

        var someElement = angular.element(document.getElementById('home-page-learn-container'));
        $document.scrollToElement(someElement, offset, duration);
    };
});