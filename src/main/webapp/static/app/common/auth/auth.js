'use strict';

/**
 * @ngdoc function
 * @name ortolangMarketApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the ortolangMarketApp
 *
 * @extends $rootScope.Scope
 *
 * @property {boolean} authenticated    - Shortcut for {@link ortolangMarketApp.AuthService#isAuthenticated}
 */
angular.module('ortolangMarketApp')
    .controller('AuthCtrl', ['$scope', '$rootScope', '$http', '$modal', 'url', 'User', 'AuthService', 'ProfileResource', 'AtmosphereService', function (/** ortolangMarketApp.controller:AuthCtrl */$scope, $rootScope, $http, $modal, url, User, AuthService, ProfileResource, AtmosphereService) {

        var serverDownModal;

        function getUser() {
            ProfileResource.connected().$promise.then(function (profile) {
                if (!profile.complete) {
                    profile.key = AuthService.getKeycloak().idTokenParsed.preferred_username;
                    profile.givenName = AuthService.getKeycloak().idTokenParsed.given_name;
                    profile.familyName = AuthService.getKeycloak().idTokenParsed.family_name;
                    profile.email = AuthService.getKeycloak().idTokenParsed.email;
                    ProfileResource.put({}, profile);
                }
                User.preInit(profile);
                ProfileResource.getInfos({key: profile.key}).$promise.then(
                    function (data) {
                        profile.profileDatas = {};
                        angular.forEach(data.entries, function (profileData) {
                            profile.profileDatas[profileData.name] = profileData;
                        });
                        User.create(profile);
                        AuthService.resolveSessionInitialized();
                        AtmosphereService.subscribe();
                    },
                    function () {
                        User.create(profile);
                        AuthService.resolveSessionInitialized();
                        AtmosphereService.subscribe();
                    }
                );
            });
        }

        $scope.$on('server-down', function () {
            if (angular.element('.server-down-modal').length === 0) {
                $http.get(url.api + '/config/ping')
                    .success(function () {
                        console.log('API server responded to ping');
                    })
                    .error(function () {
                        if (!serverDownModal) {
                            var modalScope = $scope.$new(true);
                            modalScope.refresh = function () {
                                AuthService.forceReload();
                            };
                            modalScope.$on('modal.hide', function () {
                                modalScope.$destroy();
                                serverDownModal = undefined;
                            });
                            serverDownModal = $modal({
                                scope: modalScope,
                                templateUrl: 'common/auth/templates/server-down-modal.html'
                            });
                        }
                    });
            }
        });

        function initializeSession() {
            $scope.authenticated = AuthService.isAuthenticated();
            if (AuthService.isAuthenticated()) {
                getUser();
            }
        }

        initializeSession();
    }]);
