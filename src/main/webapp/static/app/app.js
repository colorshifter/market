'use strict';

/**
 * @ngdoc overview
 * @name ortolangMarketApp
 * @description
 * # ortolangMarketApp
 *
 * Main module of the application.
 */
angular
    .module('ortolangMarketApp', [
        'ngAnimate',
        'ngRoute',
        'ngResource',
        'ngSanitize',
        'ortolangVisualizers',
        'angularFileUpload',
        'mgcrea.ngStrap.tab',
        'mgcrea.ngStrap.modal',
        'mgcrea.ngStrap.aside',
        'mgcrea.ngStrap.helpers.dimensions',
        'mgcrea.ngStrap.tooltip',
        'mgcrea.ngStrap.dropdown',
        'mgcrea.ngStrap.typeahead',
        'mgcrea.ngStrap.alert',
        'toggle-switch',
        'hljs',
        'cfp.hotkeys',
        'formly',
        'formlyBootstrap',
        'ui.bootstrap.showErrors',
        'pascalprecht.translate',
        'zeroclipboard',
        'diff-match-patch',
        'angular-md5',
        'xeditable',
        'textAngular',
        'schemaForm',
        'ngTagsInput'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/market/home'
            })
            .when('/market/home', {
                templateUrl: 'market/home.html',
                controller: 'HomeCtrl'
            })
            .when('/market/corpora', {
                templateUrl: 'market/corpora.html',
                controller: 'CorporaCtrl'
            })
            .when('/market/tools', {
                templateUrl: 'market/tools.html',
                controller: 'ToolsCtrl'
            })
            .when('/market/lexicons', {
                templateUrl: 'market/lexicons.html',
                controller: 'LexiconsCtrl'
            })
            .when('/market/applications', {
                templateUrl: 'market/applications.html',
                controller: 'ApplicationsCtrl'
            })
            .when('/market/item/:itemKey', {
                templateUrl: 'market/market-item.html',
                controller: 'MarketItemCtrl'
            })
            .when('/search', {
                templateUrl: 'market/market-search.html',
                controller: 'MarketSearchCtrl'
            })
            .when('/workspaces', {
                templateUrl: 'workspace/workspace.html',
                requiresAuthentication: true
            })
            .when('/workspaces/:wskey/:root/:path*\/browse', {
                templateUrl: 'workspace/workspace.html',
                requiresAuthentication: true
            })
            .when('/processes/', {
                templateUrl: 'processes/processes.html',
                controller: 'ProcessesCtrl',
                requiresAuthentication: true
            })
            .when('/tasks/', {
                templateUrl: 'tasks/tasks.html',
                controller: 'TasksCtrl',
                requiresAuthentication: true
            })
            .when('/information/:section', {
                templateUrl: 'information/information.html',
                controller: 'InformationCtrl',
                reloadOnSearch: false
            })
            .when('/profile/', {
                templateUrl: 'profile/profile.html',
                controller: 'ProfileCtrl',
                requiresAuthentication: true,
                resolve: {
                    func: ['AuthService', function (AuthService) {
                        return AuthService.sessionInitialized;
                    }]
                }
            })
            .when('/404', {
                templateUrl: '404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });
    }])
    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            'http://localhost:8080/**',
            'https://localhost:8443/**'
        ]);
    }])
    .config(['$tooltipProvider', function ($tooltipProvider) {
        angular.extend($tooltipProvider.defaults, {
            container: 'body',
            trigger: 'hover click focus'
        });
    }])
    .config(['hotkeysProvider', function (hotkeysProvider) {
        hotkeysProvider.cheatSheetDescription = undefined;
    }])
    .config(['uiZeroclipConfigProvider', function (uiZeroclipConfigProvider) {
        uiZeroclipConfigProvider.setZcConf({
            swfPath: '/vendor/ZeroClipboard.swf'
        });
    }])
    .run(['editableOptions', 'editableThemes', function (editableOptions, editableThemes) {
        var copy = editableThemes.bs3;
        copy.formTpl = '<form class="" role="form"></form>';
        copy.controlsTpl = '<div class="editable-controls input-group" ng-class="{\'has-error\': $error}"></div>';
        copy.buttonsTpl = '<span class="input-group-btn"></span>';
        copy.submitTpl = '<button type="submit" class="btn btn-default"><span></span></button>';
        editableThemes.bs3 = copy;
        editableOptions.theme = 'bs3';
    }]);


/**
 * @ngdoc overview
 * @name ortolangVisualizers
 * @description
 * # ortolangVisualizers
 *
 * Ortolang Visualizers Module
 */
angular.module('ortolangVisualizers', [
    'ortolangMarketApp'
]);
