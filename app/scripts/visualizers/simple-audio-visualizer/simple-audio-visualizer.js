'use strict';

/**
* @ngdoc service
* @name ortolangVisualizers.SimpleAudioVisualizer
* @description
* # SimpleAudioVisualizer
* Provider in the ortolangVisualizers.
*/
angular.module('ortolangVisualizers')
    .provider('SimpleAudioVisualizer', ['VisualizerFactoryProvider', function (VisualizerFactoryProvider) {

        var visualizer = VisualizerFactoryProvider.$get().make({
            id: 'SimpleAudioVisualizer',
            name: 'Simple Audio Visualizer',
            compatibleTypes: ['audio/webm', 'audio/ogg', 'audio/vorbis', 'audio/mp3'],
            element: '<simple-audio-visualizer></simple-audio-visualizer>'
        });

        visualizer.$get = function () {
            return visualizer;
        };

        return visualizer;
    }]);

/**
* @ngdoc directive
* @name ortolangVisualizers.directive:simpleAudioVisualizer
* @description
* # ortolangVisualizers
*/
angular.module('ortolangVisualizers')
    .directive('simpleAudioVisualizer', [ 'SimpleAudioVisualizer', function (SimpleAudioVisualizer) {

        return {
            templateUrl: '../../../views/simple-audio-visualizer.html',
            restrict: 'E',
            scope: true
        };
    }]);

