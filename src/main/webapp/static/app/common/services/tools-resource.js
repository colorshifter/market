'use strict';

/**
 * @ngdoc service
 * @name ortolangMarketApp.PluginsResource
 * @description
 * # PluginsResource
 * Factory in the ortolangMarketApp.
 */
angular.module('ortolangMarketApp')
    .factory('ToolsResource', ['$resource', 'url', function ($resource, url) {
        return $resource(url.api + '/rest/tools', {}, {
            getToolsList: {
                url: url.api + '/rest/tools/list',
                method: 'GET',
                isArray: false
            }
        });
    }]);
