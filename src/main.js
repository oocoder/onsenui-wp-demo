// MAIN.JS - Webpack main entry file
module.exports = (function(){
    require('onsenui/css/onsenui.css');
    require('onsenui/css/onsen-css-components-blue-basic-theme.css');    

    window.ons = require('onsenui/js/onsenui');
    require('angular/angular');

    var angular = window.angular;

    //global.angular.module('app', ['onsen', 'ngPensi', 'ngAnimate'])
    angular.module('demo-app', ['onsen'])
    .controller('TaskViewCtrl', ['$scope', function($scope){
        return {
            refresh : function(){
                console.log('refresh requested..');
            },

            handleSwipeGesture : function(ev, index) {
                console.log('handleSwipeGesture: ' + ev + ', ', index);
            },
            
            toggleDescShort : function(idx) {
                if(idx) isDescShortMap[idx] = isDescShortMap[idx] !== true;
            }
        };
    }])
    .run(function(){
        console.log('It worked!!!');
    });
    
    angular.element(document).ready(function() {
        require('onsenui/js/angular-onsenui');
        angular.bootstrap(document, ['demo-app']);
    });    

})();
