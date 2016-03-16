// MAIN.JS - Webpack main entry file
module.exports = (function(){
    require('onsenui/css/onsenui.css');
    require('onsenui/css/onsen-css-components-blue-basic-theme.css');    

    require('angular/angular');
    window.ons = require('onsenui/js/onsenui');
    require('onsenui/js/angular-onsenui');

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
    }]);
    
    angular.bootstrap(document, ['demo-app']);

})();
