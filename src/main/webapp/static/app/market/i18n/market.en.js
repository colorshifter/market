'use strict';

/**
 * @ngdoc service
 * @name ortolangMarketApp.MARKET_EN
 * @description
 * # MARKET_EN
 * Constant in the ortolangMarketApp.
 */
angular.module('ortolangMarketApp')
    .constant('MARKET_EN', {
        MARKET: {
            ALL_TYPE: 'All',
            CORPORA: 'Corpora',
            LEXICONS: 'Lexcon',
            TOOLS: 'Tools',
            WEBSITES: 'Websites',
            SEARCHPAGE: 'Search in data',
            PUNCH_LINE: 'Search Ortolang',
            REDACTOR_CHOICES: 'Redactor choices',
            CONDITIONS_OF_USE: 'Conditions of use',
            BROWSE: 'Browse',
            ADD_TO_FAVOURITES: 'Add to my favourites',
            USE_IN_MY_PROJECT: 'Use in my project',
            ADDITIONAL_INFORMATION: 'Additional information',
            KEYWORDS: 'Keywords',
            EXTENT: 'Extent',
            PRIMARYLANGUAGE: 'Primary language',
            DISCOURSETYPE: 'Discourse type',
            LINGUISTICSUBJECT: 'Linguistic subjects',
            SPACIAL: 'Spacial',
            TEMPORAL: 'Temporal',
            PREVIEW: 'Preview',
            LOCATION: 'Location',
            CONTRIBUTOR: 'Contributor',
            DOWNLOAD: 'Download',
            DOWNLOAD_ALL: 'You will download a complete archive of this resource {{value && value !=="" ? "("+value+")" : ""}}',
            LICENCE_DETAIL: 'Licence information',
            DEROGATION: 'Code du patrimoine',
            RESULTS_LABEL: '{{value}} result{{value > 1 ? "s" : ""}}',
            SITE: 'Website'
        }
    });
