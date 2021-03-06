'use strict';

/**
 * @ngdoc function
 * @name ortolangMarketApp.controller:SideNavCtrl
 * @description
 * # SideNavCtrl
 * Controller of the ortolangMarketApp
 */
angular.module('ortolangMarketApp')
    .controller('SideNavCtrl', [ '$rootScope', '$scope', '$route', '$translate', 'sideNavElements', 'Helper', function ($rootScope, $scope, $route, $translate, sideNavElements, Helper) {

        $scope.sideNavElements = sideNavElements;
        $scope.sideNavActiveClass = null;

        $scope.select = function (elementClass) {
            if ($scope.sideNavActiveClass !== elementClass) {
                $scope.sideNavActiveClass = elementClass;
            }
        };

        // *********************** //
        //          Events         //
        // *********************** //

        $rootScope.$on('$routeUpdate', function () {
            if (Helper.isModalOpened()) {
                Helper.hideModal();
            }
            Helper.hideAsideMobileNav();
        });

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            if (current.$$route) {
                Helper.hideAsideMobileNav();
                if (current.$$route.title) {
                    $rootScope.ortolangPageTitle = $translate.instant(current.$$route.title) + ' | ';
                } else if (previous || current.$$route.originalPath === '/') {
                    $rootScope.ortolangPageTitle = '';
                } else {
                    $rootScope.ortolangPageTitle = undefined;
                }
                if (angular.isUndefined(current.$$route.description)) {
                    $rootScope.ortolangPageDescription = '';
                } else if (current.$$route.description === 'default') {
                    $rootScope.ortolangPageDescription = 'Outils et Ressources pour un Traitement Optimisé de la LANGue';
                } else {
                    $rootScope.ortolangPageDescription = $translate.instant(current.$$route.description);
                }
                $scope.reducedSideNav = current.$$route.originalPath === '/workspaces' || current.$$route.originalPath === '/workspaces/:alias';
                if (previous) {
                    switch (current.$$route.originalPath) {
                        case '/':
                            $scope.select('home');
                            break;
                        case '/news':
                            $scope.select('news');
                            break;
                        case '/profiles/me/edition':
                        case '/profiles/me/tasks':
                        case 'profiles/:key':
                            $scope.select('profile');
                            break;
                        case '/search':
                            $scope.select('search');
                            break;
                        case '/information/:section?':
                            $scope.select('information');
                            break;
                        case '/market/corpora':
                            $scope.select('corpora');
                            break;
                        case '/market/applications':
                            $scope.select('applications');
                            break;
                        case '/market/tools':
                            $scope.select('tools');
                            break;
                        case '/market/lexicons':
                            $scope.select('lexicons');
                            break;
                        case '/market/terminologies':
                            $scope.select('terminologies');
                            break;
                        case '/producers':
                        case '/producers/:producerId':
                        case '/contributors/:contributorId':
                            $scope.select('producers');
                            break;
                        case '/market/:section/:alias/:version?':
                            if (current.params.section) {
                                $scope.select(current.params.section);
                            }
                            break;
                        case '/workspaces':
                        case '/workspaces/:alias':
                            $scope.select('workspaces');
                            break;
                        default:
                            $scope.select();
                            break;
                    }
                } else {
                    var regExp, i, currentPath;
                    if ($route.current.originalPath === '/') {
                        $scope.select('home');
                    } else if ($route.current.originalPath === '/news') {
                        $scope.select('news');
                    } else {
                        for (i = 1; i < sideNavElements.length; i++) {
                            regExp = new RegExp('^' + sideNavElements[i].path);
                            currentPath = $route.current.originalPath;
                            if (currentPath.indexOf(':section') !== -1) {
                                currentPath = currentPath.replace(':section', $route.current.params.section);
                            }
                            if (regExp.test(currentPath)) {
                                $scope.select(sideNavElements[i].class);
                                break;
                            }
                        }
                    }
                }
            }
        });
    }]);
