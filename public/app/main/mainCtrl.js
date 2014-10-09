'use strict';

app.controller('MainCtrl', function($scope, $document){
    $scope.scrollToLearn = function() {
        var duration = 100;
        var offset = 30;

        var someElement = angular.element(document.getElementById('home-page-learn-container'));
        $document.scrollToElement(someElement, offset, duration);
    }

    $scope.interval = 2500;

    var slides = $scope.products = [];
    $scope.addSlide = function() {
        var newWidth = 600 + slides.length;
        slides.push({
            image: 'http://placekitten.com/' + newWidth + '/300',
            name: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    for (var i=0; i<4; i++) {
        $scope.addSlide();
    }
});