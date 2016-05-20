'use strict';

/**
 * @ngdoc function
 * @name ortolangMarketApp.controller:Corpora
 * @description
 * # Corpora
 * Controller of the ortolangMarketApp
 */
angular.module('ortolangMarketApp')
    .controller('CorporaCtrl', ['$scope', '$location', 'SearchProvider', function ($scope, $location, SearchProvider) {

        $scope.search = function () {
            $location.url('market/search/corpora').search('content', $scope.content);
        };

        function init() {
            $scope.searchRecents = SearchProvider.make();
            $scope.searchRecents.setActiveOrderProp('publicationDate', true);
            $scope.paramsRecents = '{"title":"", "limit":"10", "orderProp":"publicationDate", "orderDir":"desc"}';
            $scope.searchFreeCorpora = SearchProvider.make();
            $scope.searchFreeCorpora.setActiveOrderProp('publicationDate', true);
            $scope.paramsFreeCorpora = '{"title":"", "statusOfUse.key":"referential:free_use", "limit":"10", "orderProp":"publicationDate", "orderDir":"desc"}';
            $scope.searchWrittenCorpora = SearchProvider.make();
            $scope.searchWrittenCorpora.setActiveOrderProp('publicationDate', true);
            $scope.paramsWrittenCorpora = '{"title":"", "corporaType.key":"referential:written_corpora", "limit":"10", "orderProp":"publicationDate", "orderDir":"desc"}';
            $scope.searchSpeechCorpora = SearchProvider.make();
            $scope.searchSpeechCorpora.setActiveOrderProp('publicationDate', true);
            $scope.paramsSpeechCorpora = '{"title":"", "corporaType.key":"referential:speech_corpora", "limit":"10", "orderProp":"publicationDate", "orderDir":"desc"}';
        }

        init();

    }]);
