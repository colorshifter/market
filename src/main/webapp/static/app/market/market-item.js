'use strict';

/**
 * @ngdoc function
 * @name ortolangMarketApp.controller:MarketItemCtrl
 * @description
 * # MarketItemCtrl
 * Controller of the ortolangMarketApp
 */
angular.module('ortolangMarketApp')
    .controller('MarketItemCtrl', ['$scope', '$routeParams', '$translate', '$location', '$route', '$filter', 'SearchResource', 'QueryBuilderFactory', 'MarketBrowserService', function ($scope, $routeParams, $translate, $location, $route, $filter, SearchResource, QueryBuilderFactory, MarketBrowserService) {

        function loadItem() {

            var queryBuilder = QueryBuilderFactory.make({projection: 'key, `meta_ortolang-item-json`.toJSON("fetchPlan:*:-1")', source: 'collection'});
            
            queryBuilder.addProjection('meta_ortolang-workspace-json.snapshotName', 'snapshotName');
            queryBuilder.addProjection('meta_ortolang-workspace-json.wskey', 'wskey');
            queryBuilder.addProjection('meta_ortolang-item-json.type', 'type');

            queryBuilder.equals('status', 'published').and().equals('meta_ortolang-workspace-json.wsalias', $scope.itemAlias);

            SearchResource.json({query: queryBuilder.toString()}, function (results) {
                if (results.length >= 1) {
                    if (!/^(corpora|lexicons|applications|tools)$/.test($routeParams.section)) {
                        switch (results[results.length - 1].type) {
                            case 'Corpus':
                                $route.updateParams({section: 'corpora'});
                                break;
                            case 'Lexique':
                                $route.updateParams({section: 'lexicons'});
                                break;
                            case 'Application':
                                $route.updateParams({section: 'applications'});
                                break;
                            case 'Outil':
                                $route.updateParams({section: 'tools'});
                                break;
                        }
                        $location.replace();
                        return;
                    }

                    queryBuilder = QueryBuilderFactory.make({projection: '*', source: 'workspace'});
                    queryBuilder.addProjection('meta_ortolang-workspace-json.wskey', 'wskey');
                    queryBuilder.addProjection('meta_ortolang-workspace-json.wsalias', 'wsalias');
                    queryBuilder.addProjection('meta_ortolang-workspace-json.tags', 'tags');
                    queryBuilder.equals('meta_ortolang-workspace-json.wsalias', $scope.itemAlias);
                    SearchResource.json({query: queryBuilder.toString()}, function (workspace) {

                        if (workspace.length === 1) {
                            var filteredResult;
                            workspace = workspace[0];

                            $scope.tags = $filter('orderBy')(workspace.tags, function (tag) {
                                return tag.name;
                            });

                            if ($routeParams.version) {
                                var filteredTag = $filter('filter')($scope.tags, {name: $routeParams.version}, true);
                                if (filteredTag.length === 1) {
                                    $scope.tag = filteredTag[0];
                                }
                            }
                            if (!$scope.tag) {
                                $scope.tag = $scope.tags[$scope.tags.length - 1];
                            }
                            filteredResult = $filter('filter')(results, {snapshotName:  $scope.tag.snapshot}, true);
                            $scope.ortolangObject = filteredResult[0];

                            MarketBrowserService.workspace = {alias: $scope.itemAlias, key: workspace.wskey};
                            $scope.root = $scope.ortolangObject.snapshotName;
                            $scope.itemKey = $scope.ortolangObject.key;

                            // var queryOrtolangMeta = 'SELECT @this.toJSON("fetchPlan:*:-1") FROM ' + $scope.ortolangObject['meta_ortolang-item-json'];
                            // var queryOrtolangMeta = 'SELECT FROM ' + $scope.ortolangObject['meta_ortolang-item-json'];
                            // SearchResource.json({query: queryOrtolangMeta}, function (jsonObject) {
                            //     $scope.item = angular.fromJson(jsonObject[0].this);
                                // $scope.item = jsonObject[0];
                            //     $scope.ready = true;
                            // });
                            $scope.item = angular.fromJson($scope.ortolangObject['meta_ortolang-item-json']);
                            $scope.ready = true;
                        }

                    });

                }
            });
        }

        function init() {
            $scope.itemAlias = $routeParams.alias;
            $scope.browse = $location.search().browse;
            $scope.ready = false;
            $scope.item = {};
            loadItem();
        }

        init();

    }]);
