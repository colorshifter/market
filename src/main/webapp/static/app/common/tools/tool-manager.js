'use strict';

/**
 * @ngdoc service
 * @name ortolangVisualizers.ToolManager
 * @description
 * # ToolManager
 * Factory in the ortolangMarketApp.
 */
angular.module('ortolangMarketApp')
    .factory('ToolManager', ['$resource', '$q', '$translate', '$rootScope', '$window', '$timeout', 'ObjectResource', 'DownloadResource', 'JsonResultResource', 'QueryBuilderService',
        function ($resource, $q, $translate, $rootScope, $window, $timeout, ObjectResource, DownloadResource, JsonResultResource, QueryBuilderService) {

            // ---
            // ORTOLANG TOOL DEFINITION
            // ---

            // Constructor
            function OrtolangTool(config) {
                this.id = undefined;
                this.key = undefined;
                this.name = undefined;
                this.description = undefined;
                this.documentation = undefined;
                this.meta = undefined;
                this.url = undefined;
                this.config = undefined;
                this.active = undefined;
                this.content = undefined;
                this.categories = undefined;

                angular.forEach(config, function (value, key) {
                    if (this.hasOwnProperty(key)) {
                        this[key] = value;
                    }
                }, this);

                this.resource = $resource(this.url, {}, {
                    getExecutionForm: {
                        url: this.url + '/execution-form',
                        method: 'GET',
                        isArray: true
                    },
                    getJobs: {
                        url: this.url + '/jobs',
                        method: 'GET'
                    },
                    createJob: {
                        url: this.url + '/jobs',
                        method: 'POST',
                        transformRequest: function (data) {
                            return $.param(data);
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    },
                    abort: {
                        url: this.url + '/jobs/:jobId/abort',
                        method: 'GET'
                    },
                    getAuthStatus: {
                        url: this.url + '/client/grant',
                        method: 'GET'
                    },
                    getLog: {
                        url: this.url + '/jobs/:jobId/log',
                        method: 'GET'
                    },
                    getResult: {
                        url: this.url + '/jobs/:jobId/result',
                        method: 'GET',
                        isArray: true
                    }
                });
            }

            // Methods
            OrtolangTool.prototype = {

                getId: function () {
                    return this.id;
                },

                getKey: function () {
                    return this.key;
                },

                getName: function () {
                    return this.name || this.id;
                },

                getDescription: function () {
                    return this.description;
                },

                getDocumentation: function () {
                    return this.documentation;
                },

                getMeta: function () {
                    return this.meta;
                },

                getUrl: function () {
                    return this.url;
                },

                getContent: function () {
                    return this.content;
                },

                getCategories: function () {
                    return this.categories;
                },

                getResource: function () {
                    return this.resource;
                },

                getExecutionForm: function () {
                    if (!this.getActive()) {
                        throw ('The tool "' + this.getKey() + '" is not active');
                    }
                    if (this.config) {
                        return this.config;
                    }
                    return this.resource.getExecutionForm({language: $translate.use()});
                },

                getActive: function () {
                    return this.active;
                },

                getJobs: function () {
                    return this.resource.getJobs();
                },

                createJob: function (formData) {
                    return this.resource.createJob({}, formData);
                },

                abortJob: function (jobId) {
                    return this.resource.abort({jobId:jobId});
                },

                getAuthStatus: function () {
                    var deferred = $q.defer();
                    this.resource.getAuthStatus().$promise.then(function (url) {
                        if (url) {
                            deferred.resolve(url);
                        } else {
                            deferred.resolve(true);
                        }
                    });
                    return deferred.promise;
                },

                getLog: function (jobId) {
                    return this.resource.getLog({jobId:jobId});
                },

                getResult: function (jobId) {
                    return this.resource.getResult({jobId:jobId});
                },

                getDownloadUrl: function (jobId, path) {
                    return this.url + '/jobs/' + jobId + '/download?path=' + path;
                }
            };

            // ---
            // MANAGER.
            // ---

            var registry = {},
                grantPopup,
                grantTimeout,
                grantTimeoutDelay = 500;

            function getRegistry() {
                return registry;
            }

            function getActiveTools() {
                var activeTools = [];
                angular.forEach(registry, function (tool) {
                    if(tool.active) {
                        activeTools.push(tool);
                    }
                });
                return activeTools;
            }

            function register(tool) {
                if (registry[tool.getKey()]) {
                    console.error('A tool with the id "%s" has already been registered', tool.getKey());
                    return;
                }
                registry[tool.getKey()] = tool;
                //console.info('register tool : ', (registry[tool.getKey()]));
            }

            function populateToolList() {

                var queryBuilder = QueryBuilderService.make(
                    {
                        projection:
                        'key, meta.title as title, ' +
                        'meta.description as description, ' +
                        'meta.image as image, ' +
                        'meta.toolId as toolId, ' +
                        'meta.toolHelp as toolHelp, ' +
                        'meta.toolUrl as toolUrl, ' +
                        'meta.toolContent as toolContent, ' +
                        'meta.toolCategory as toolCategory',
                        source: 'collection'
                    });
                queryBuilder.equals('status', 'published');
                queryBuilder.and();
                queryBuilder.equals('meta.type', 'Outil');

                var query = queryBuilder.toString();
                console.log('query : ' + query);
                JsonResultResource.get({query: query}).$promise.then(function (jsonResults) {
                    angular.forEach(jsonResults, function(itemMeta) {
                        var item = {};

                        var data = angular.fromJson(itemMeta);
                        item.key = data.key;
                        item.id = data.toolId;
                        item.name = data.title;
                        item.description = data.description;
                        item.documentation = data.toolHelp;
                        item.url = data.toolUrl;
                        item.content = data.toolContent;
                        item.categories = data.toolCategory;
                        item.meta = data;
                        if(item.url !== undefined && item.url !== '') {
                            item.active = true;
                        }

                        register(new OrtolangTool(item));
                        console.log('register '+item.name);
                    });
                    console.log('fin populate tool list');
                    $rootScope.$broadcast('tool-list-registered');

                }, function (reason) {
                    console.error('An issue occurred when trying to get the tool list: %o', reason);
                });
            }

            function disableTool(toolKey) {
                if (registry[toolKey]) {
                    registry[toolKey].active = false;
                    console.warn('The tool "%s" has been disabled', toolKey);
                    return;
                }
                console.error('There is no tool with the id "%s" in registry', toolKey);
            }

            function getTool(toolKey) {
                return registry[toolKey];
            }

            function getKeys() {
                return Object.keys(registry);
            }

            function toArray(obj) {
                var output = [];
                Object.keys(obj).forEach(function (key) {
                    output.push(getTool(key));
                });
                return output;
            }

            function checkPopup(toolKey, deferred) {
                if (grantPopup.closed) {
                    $timeout.cancel(grantTimeout);
                    checkGrant(toolKey, deferred);
                } else {
                    grantTimeout = $timeout(function () {
                        checkPopup(toolKey, deferred);
                    }, grantTimeoutDelay);
                }
            }

            function checkGrant(toolKey, previousDeferred) {
                var deferred = $q.defer();
                getTool(toolKey).getAuthStatus().then(function (response) {
                    if (response.url) {
                        if (previousDeferred) {
                            // Grant cancelled
                            previousDeferred.reject();
                        } else {
                            grantPopup = $window.open(response.url, '', 'width=400, height=600, top=200, left=200');
                            grantTimeout = $timeout(function () {
                                checkPopup(toolKey, deferred);
                            }, grantTimeoutDelay);
                        }
                    } else {
                        // Grant OK
                        if (previousDeferred) {
                            previousDeferred.resolve(true);
                        } else {
                            deferred.resolve(true);
                        }
                    }
                });
                if (previousDeferred === undefined) {
                    return deferred.promise;
                }
            }


            // *********************** //
            //           Init          //
            // *********************** //

            function init() {
                populateToolList();
            }

            init();

            return {
                getRegistry: getRegistry,
                getActiveTools: getActiveTools,
                getTool: getTool,
                disableTool: disableTool,
                checkGrant: checkGrant,
                getKeys: getKeys,
                toArray: toArray
            };
        }]);
