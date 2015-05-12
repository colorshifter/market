'use strict';

/**
 * @ngdoc function
 * @name ortolangMarketApp.controller:ProcessesCtrl
 * @description
 * # ProcessesCtrl
 * Controller of the ortolangMarketApp
 */
angular.module('ortolangMarketApp')
    .controller('ProcessesCtrl', ['$scope', '$modal', '$routeParams', 'Runtime', 'ToolManager', '$alert',
        function ($scope, $modal, $routeParams, Runtime, ToolManager, $alert) {

            $scope.Runtime = Runtime;

            $scope.completedProcessessDisplayed = 3;

            $scope.showLog = function (process, processKey) {
                if (processKey) {
                    process = Runtime.selectProcessByKey(processKey);
                } else {
                    Runtime.selectProcess(process);
                }
                if (process) {
                    $scope.maxProcessLogHeight = (window.innerHeight - 170) + 'px';
                    $modal({
                        title: process.name,
                        html: true,
                        scope: $scope,
                        template: 'processes/process-log-modal-template.html',
                        show: true
                    });
                }
            };

            $scope.showToolLog = function (process) {
                Runtime.selectRemoteProcess(process);
                $scope.maxProcessLogHeight = (window.innerHeight - 170) + 'px';
                ToolManager.getTool(process.toolKey).getLog(process.jobId).$promise.then(function(data) {
                    $scope.jobLog = data.log;
                    $modal({
                        title: process.processTool.name,
                        html: true,
                        scope: $scope,
                        template: 'common/tools/tool-tpl-log.html',
                        show: true
                    });
                });
            };

            $scope.abortToolJob = function (process) {
                Runtime.selectRemoteProcess(process);
                ToolManager.getTool(process.toolKey).abortJob(process.jobId).$promise.then(
                    function () {
                        $alert({title: process.processTool.name, content: 'annulé', placement: 'top-right', type: 'success', show: true});
                    },
                    function () {
                        $alert({title: process.processTool.name, content: 'pas annulé', placement: 'top-right', type: 'danger', show: true});
                    }
                );
            };

            $scope.showToolParam = function (process) {
                Runtime.selectRemoteProcess(process);
                console.debug($scope.selectedRemoteProcess.job.parameters);
                $modal({
                    title: process.processTool.name,
                    html: true,
                    scope: $scope,
                    template: 'common/tools/tool-tpl-parameters.html',
                    show: true
                });
            };

            $scope.showResult = function (process) {
                Runtime.selectRemoteProcess(process);
                ToolManager.getTool(process.toolKey).getResult(process.jobId).$promise.then(function (data) {
                    $scope.results = data;
                    $scope.jname = process.processTool.name;
                    $scope.job = process;
                    ToolManager.getTool(process.toolKey).getLog(process.jobId).$promise.then(function(data) {
                        $scope.jobLog = data.log;
                        $modal({
                            title: process.processTool.name,
                            html: true,
                            scope: $scope,
                            template: 'common/tools/tool-result-modal-template.html',
                            show: true
                        });
                    });
                });

            };


            $scope.activeTab = 0;

            $scope.showAll = function ($event) {
                $($event.target).addClass('hidden').prev('table').addClass('show-all');
            };

            if ($routeParams.pKey) {
                $scope.showLog(undefined, $routeParams.pKey);
            }

            $scope.test = function () {
                Runtime.createProcess({
                    'process-type': 'test',
                    'process-name': 'Test process',
                    'name': 'John'
                });
            };
        }]);
