'use strict';

/**
 * @ngdoc component
 * @name ortolangMarketApp.component:organizationCard
 * @description
 * # organizationCard
 * Component of the ortolangMarketApp
 */
angular.module('ortolangMarketApp')
    .component('organizationCard', {
        bindings: {
            organization: '<',
            size: '@',
            imgClasses: '@',
            icons: '<'
        },
        templateUrl: 'common/directives/organization-card.component.html'
    });
