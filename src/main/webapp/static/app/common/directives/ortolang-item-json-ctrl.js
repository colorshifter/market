'use strict';

/**
 * @ngdoc function
 * @name ortolangMarketApp.controller:OrtolangItemJsonCtrl
 * @description
 * # OrtolangItemJsonCtrl
 * Controller of the ortolangMarketApp
 */
angular.module('ortolangMarketApp')
    .controller('OrtolangItemJsonCtrl', ['$scope', '$rootScope', '$q', '$filter', '$location', '$modal', '$translate', '$analytics', 'Helper', 'Settings', 'VisualizerService', 'Content', 'WorkspaceResource', 'ReferentialResource', 'ObjectResource', 'url', 'User',
        function ($scope, $rootScope, $q, $filter, $location, $modal, $translate, $analytics, Helper, Settings, VisualizerService, Content, WorkspaceResource, ReferentialResource, ObjectResource, url, User) {

            function loadReferentialEntities(items, dest) {
                if (items && items.length > 0) {
                    var promises = [],
                        tmp = [];
                    angular.forEach(items, function (item, index) {
                        if (Helper.startsWith(item, '$')) {
                            promises.push(ReferentialResource.get({name: Helper.extractNameFromReferentialId(item)}, function (entity) {
                                tmp[index] = angular.fromJson(entity.content);
                            }));
                        } else if (angular.isDefined(item['meta_ortolang-referential-json'])) {
                            // From Market
                            tmp[index] = item['meta_ortolang-referential-json'];
                        } else {
                            // From Workspace (Producer that needs to be checked)
                            tmp[index] = item;
                        }
                    });
                    $q.all(promises).then(function () {
                        $scope[dest] = tmp;
                    }, function (reason) {
                        console.error(reason);
                        $scope[dest] = tmp;
                    });
                }
            }

            function loadProducers() {
                loadReferentialEntities($scope.content.producers, 'producers');
            }

            function loadSponsors() {
                loadReferentialEntities($scope.content.sponsors, 'sponsors');
            }

            function getValues(arr, propertyName, propertyValue) {
                var values = [];
                if (arr) {
                    var iObject;
                    for (iObject = 0; iObject < arr.length; iObject++) {
                        if (arr[iObject][propertyName] === propertyValue) {
                            values.push(arr[iObject].value);
                        }
                    }
                }
                return values;
            }

            function getValue(arr, propertyName, propertyValue, defaultValue) {
                var values = getValues(arr, propertyName, propertyValue);
                if (arr && values.length === 0) {
                    return arr.length > 0 ? arr[0].value : defaultValue;
                }
                return values[0];
            }

            function refreshMultilingualValue(item, lang) {
                $scope.title = getValue(item.title, 'lang', lang, 'Untitled');
                $scope.description = getValue(item.description, 'lang', lang);
                if (item.keywords) {
                    $scope.keywords = getValues(item.keywords, 'lang', lang);
                    if ($scope.keywords.length === 0) {
                        $scope.keywords = getValues(item.keywords, 'lang', 'fr');
                    }
                }
                if (item.bibliographicCitation) {
                    $scope.bibliographicCitation = getValue(item.bibliographicCitation, 'lang', lang);
                }
            }

            function loadContributors() {
                if ($scope.content.contributors) {
                    $scope.contributors = [];
                    $scope.authors = [];

                    angular.forEach($scope.content.contributors, function (contributor) {
                        var loadedContributor = {};
                        if (Helper.startsWith(contributor.entity, '$')) {
                            // From Workspace preview with contributor inside the referential
                            ReferentialResource.get({name: Helper.extractNameFromReferentialId(contributor.entity)}, function (entity) {
                                loadedContributor.entity = angular.fromJson(entity.content);
                            });

                            if (contributor.roles && contributor.roles.length > 0) {
                                loadedContributor.roles = [];
                                angular.forEach(contributor.roles, function (role) {
                                    ReferentialResource.get({name: Helper.extractNameFromReferentialId(role)}, function (entity) {
                                        var contentRole = angular.fromJson(entity.content);
                                        loadedContributor.roles.push(Helper.getMultilingualValue(contentRole.labels));

                                        if (contentRole.id === 'author') {
                                            $scope.authors.push(loadedContributor);
                                        }
                                    });
                                });
                            }

                            if (contributor.organization) {
                                ReferentialResource.get({name: Helper.extractNameFromReferentialId(contributor.organization)}, function (entity) {
                                    loadedContributor.organization = angular.fromJson(entity.content);
                                });
                            }

                            $scope.contributors.push(loadedContributor);

                        } else if (angular.isDefined(contributor.entity['meta_ortolang-referential-json'])) {
                            // From Market with contributor from referential
                            loadedContributor.entity = contributor.entity['meta_ortolang-referential-json'];
                            if (angular.isDefined(contributor.organization)) {
                                loadedContributor.organization = contributor.organization['meta_ortolang-referential-json'];
                            }
                            loadedContributor.roles = [];
                            angular.forEach(contributor.roles, function (role) {
                                loadedContributor.roles.push(Helper.getMultilingualValue(role['meta_ortolang-referential-json'].labels));

                                if (role['meta_ortolang-referential-json'].id === 'author') {
                                    $scope.authors.push(loadedContributor);
                                }
                            });

                            $scope.contributors.push(loadedContributor);
                        } else {
                            // From Workspace (Contributor that needs to be checked) and Market with contributor outside the referential
                            loadedContributor.entity = contributor.entity;

                            if (contributor.organization) {
                                if (Helper.startsWith(contributor.organization, '$')) {
                                    ReferentialResource.get({name: Helper.extractNameFromReferentialId(contributor.organization)}, function (entity) {
                                        loadedContributor.organization = angular.fromJson(entity.content);
                                    });
                                } else {
                                    loadedContributor.organization = contributor.organization['meta_ortolang-referential-json'];
                                }
                            }

                            if (contributor.roles && contributor.roles.length > 0) {

                                loadedContributor.roles = [];
                                angular.forEach(contributor.roles, function (role) {
                                    if (Helper.startsWith(role, '$')) {
                                        ReferentialResource.get({name: Helper.extractNameFromReferentialId(role)}, function (entity) {
                                            var contentRole = angular.fromJson(entity.content);
                                            loadedContributor.roles.push(Helper.getMultilingualValue(contentRole.labels));

                                            if (contentRole.id === 'author') {
                                                $scope.authors.push(loadedContributor);
                                            }
                                        });
                                    } else {
                                        loadedContributor.roles.push(Helper.getMultilingualValue(role['meta_ortolang-referential-json'].labels));

                                        if (role['meta_ortolang-referential-json'].id === 'author') {
                                            $scope.authors.push(loadedContributor);
                                        }
                                    }
                                });
                            }
                            $scope.contributors.push(loadedContributor);
                        }
                    });
                }
            }

            function loadLicense(lang) {
                if ($scope.content.license) {
                    if (Helper.startsWith($scope.content.license, '$')) {
                        // From Workspace
                        ReferentialResource.get({name: Helper.extractNameFromReferentialId($scope.content.license)}, function (entity) {
                            $scope.license = angular.fromJson(entity.content);
                            if ($scope.license.description) {
                                $scope.license.effectiveDescription = Helper.getMultilingualValue($scope.license.description, lang);
                            }
                            if ($scope.license.text) {
                                $scope.license.effectiveText = Helper.getMultilingualValue($scope.license.text, lang);
                            }
                        });
                    } else if (angular.isDefined($scope.content.license['meta_ortolang-referential-json'])) {
                        // From Market
                        $scope.license = $scope.content.license['meta_ortolang-referential-json'];
                        if ($scope.license.description) {
                            $scope.license.effectiveDescription = Helper.getMultilingualValue($scope.license.description, lang);
                        }
                        if ($scope.license.text) {
                            $scope.license.effectiveText = Helper.getMultilingualValue($scope.license.text, lang);
                        }
                    } else {
                        $scope.license = $scope.content.license;
                        if ($scope.license.text) {
                            var value = Helper.getMultilingualValue($scope.license.text, lang);
                            if (value && value.path) {
                                ObjectResource.element({
                                    key: $scope.itemKey,
                                    path: value.path
                                }).$promise.then(function (oobject) {
                                    $scope.textFileKey = oobject.key;
                                });
                            }
                        }
                    }
                }
            }

            function getItemType(item) {
                switch (item.type) {
                    case 'Corpus':
                        return 'corpora';
                    case 'Lexique':
                        return 'lexicons';
                    case 'Application':
                        return 'applications';
                    case 'Outil':
                        return 'tools';
                    case 'Terminologie':
                        return 'terminologies';
                }
            }

            function loadCommonFields() {

                refreshMultilingualValue($scope.content, Settings.language);
                $scope.itemMarketType = getItemType($scope.content);

                if ($scope.content.image) {
                    $scope.image = Content.getThumbUrlWithPath($scope.content.image, $scope.alias, $scope.root, 180);
                } else {
                    $scope.imgtitle = '';
                    $scope.imgtheme = 'custom';
                    if ($scope.title) {
                        $scope.imgtitle = $scope.title.substring(0, 2);
                        $scope.imgtheme = $scope.title.substring(0, 1).toLowerCase();
                    }
                }

                if ($scope.content.datasize !== undefined && $scope.content.datasize !== '') {
                    $scope.datasizeToPrint = {'value': $filter('bytes')($scope.content.datasize)};
                }
            }

            function loadItem() {

                if (!$scope.preview) {
                    $rootScope.ortolangPageTitle = getValue($scope.content.title, 'lang', Settings.language, 'Untitled') + ' | ';
                }

                if ($scope.content.schema) {
                    if ($location.search().path) {
                        $scope.browseContent();
                    }

                    if ($scope.content.schema === 'http://www.ortolang.fr/schema/013#') {
                        $scope.marketItemTemplate = 'market/templates/ortolang-item-json-13.html';
                        loadCommonFields();
                    } else if ($scope.content.schema === 'http://www.ortolang.fr/schema/014#') {
                        $scope.marketItemTemplate = 'market/templates/ortolang-item-json-14.html';
                        loadCommonFields();
                    } else if ($scope.content.schema === 'http://www.ortolang.fr/schema/015#') {
                        $scope.marketItemTemplate = 'market/templates/ortolang-item-json-15.html';
                        loadCommonFields();
                    } else if ($scope.content.schema === 'http://www.ortolang.fr/schema/016#') {
                        $scope.marketItemTemplate = 'market/templates/ortolang-item-json-16.html';
                        loadCommonFields();
                    } else {
                        $scope.marketItemTemplate = 'market/templates/ortolang-item-json-unknown.html';
                    }
                } else {
                    $scope.marketItemTemplate = 'market/templates/ortolang-item-json-unknown.html';
                }
            }

            $scope.$on('$routeUpdate', function () {
                if (angular.isUndefined($location.search().path) && $scope.browse) {
                    $scope.browseContent();
                } else if (angular.isDefined($location.search().path) && !$scope.browse) {
                    $scope.browseContent();
                }
            });

            $scope.browseContent = function () {
                if ($scope.browse) {
                    $location.search({});
                }
                $scope.browse = !$scope.browse;
            };

            $scope.toggleDescription = function () {
                $scope.showingDescription = !$scope.showingDescription;
            };

            $scope.exportItem = function () {
                var analyticsUrl = url.content + '/export/' + $scope.alias + '/' + $scope.root;
                $analytics.trackLink(analyticsUrl, 'download');
                Content.exportSingle($scope.alias, $scope.root, '/', $scope.alias);
            };

            $scope.seeContributorPage = function (contributor) {
                if (contributor.entity.id) {
                    $location.url('/contributors/' + contributor.entity.id);
                }
            };

            $scope.computeTextCitation = function ($scope) {
                if ($scope.bibliographicCitation) {
                    return $scope.bibliographicCitation;
                }
                var citation = '', i;
                if ($scope.content.publications && $scope.content.publications.length > 0) {
                    angular.forEach($scope.content.publications, function (publication) {
                        citation += '<p>' + publication + '</p>';
                    });
                }
                if ($scope.producers && $scope.producers.length > 0) {
                    for (i = 0; i < $scope.producers.length; i++) {
                        if ($scope.producers[i]) {
                            if (i !== 0) {
                                citation += ', ';
                            }
                            citation += $scope.producers[i].name + ($scope.producers[i].acronym ? ' (' + $scope.producers[i].acronym + ')' : '');
                        }
                    }
                } else if ($scope.authors && $scope.authors.length > 0) {
                    for (i = 0; i < $scope.authors.length; i++) {
                        if ($scope.authors[i].entity) {
                            if (i !== 0) {
                                citation += ', ';
                            }
                            citation += $scope.authors[i].entity.fullname;
                        }
                    }
                }
                citation += ' (' + $filter('date')($scope.content.publicationDate, 'yyyy') + ').';
                citation += ' <i>' + $scope.title + '</i> [' + $scope.content.type + '].';
                citation += ' ORTOLANG (Open Resources and TOols for LANGuage) - <a target="_BLANK" href="https://www.ortolang.fr">www.ortolang.fr</a>,';
                citation += ' <a target="_BLANK" href="' + $scope.handle + '">' + $scope.handle + '</a>.';
                return citation;
            };

            // https://en.wikibooks.org/wiki/LaTeX/Special_Characters
            var bibtexSpecialChars = {
                '%': '\\%',
                '$': '\\$',
                '{': '\\{',
                '_': '\\_',
                '¶': '\\P',
                '‡': '\\ddag',
                '|': '\\textbar',
                '>': '\\textgreater',
                '–': '\\textendash',
                '™': '\\texttrademark',
                '¡': '\\textexclamdown',
                '£': '\\pounds',
                '#': '\\#',
                '&': '\\&',
                '}': '\\}',
                '§': '\\S',
                '†': '\\dag',
                '\\': '\\textbackslash{}',
                '<': '\\textless',
                '—': '\\textemdash',
                '®': '\\textregistered',
                'ⓐ': '\\textcircled{a}',
                '©': '\\copyright',
                '¿': '\\textquestiondown',
                'ò': '\\`{o}',
                'ó': '\\\'{o}',
                'ô': '\\^{o}',
                'ö': '\\"{o}',
                'ő': '\\H{o}',
                'õ': '\\~{o}',
                'ç': '\\c{c}',
                'ą': '\\k{a}',
                'ł': '\\l{}',
                'ō': '\\={o}',
                // o_
                'ȯ': '\\.{o}',
                'ụ': '\\d{u}',
                'å': '\\r{a}',
                'ŏ': '\\u{o}',
                'š': '\\v{s}',
                'ø': '\\o',
                'î': '\\^{\\i}',
                'ï': '\\"{\\i}',
                '^': '\\textasciicircum{}',
                '~': '\\textasciitilde{}'
            };

            function replaceSpecialChars(str) {
                return str.replace(/[\D]/g, function (a) {
                    return bibtexSpecialChars[a] || a;
                });
            }

            $scope.computeBibtexCitation = function ($scope) {
                if ($scope.bibliographicCitation) {
                    return undefined;
                }
                var i,
                    bibTeX = '@misc{' + url.handlePrefix + '/' + $scope.alias + ($scope.tag ? '/' + $scope.tag.name : '') + ',\n';
                bibTeX += '    title = {' + replaceSpecialChars($scope.title) + '},\n';
                bibTeX += '    author = {';
                if ($scope.producers && $scope.producers.length > 0) {
                    for (i = 0; i < $scope.producers.length; i++) {
                        if (i !== 0) {
                            bibTeX += ' and ';
                        }
                        if ($scope.producers[i].acronym) {
                            bibTeX += replaceSpecialChars($scope.producers[i].acronym);
                        } else {
                            bibTeX += '{' + replaceSpecialChars($scope.producers[i].name) + '}';
                        }
                    }
                } else if ($scope.authors && $scope.authors.length > 0) {
                    for (i = 0; i < $scope.authors.length; i++) {
                        if ($scope.authors[i].entity) {
                            if (i !== 0) {
                                bibTeX += ', ';
                            }
                            bibTeX += replaceSpecialChars($scope.authors[i].entity.fullname);
                        }
                    }
                }
                bibTeX += '},\n';
                bibTeX += '    url = {' + replaceSpecialChars($scope.handle) + '},\n';
                bibTeX += '    note = {{ORTOLANG} ({Open} {Resources} {and} {TOols} {for} {LANGuage}) \\textendash www.ortolang.fr},\n';
                if ($scope.license && $scope.license.label) {
                    bibTeX += '    copyright = {' + replaceSpecialChars($scope.license.label) + '},\n';
                }
                bibTeX += '    year = {' + $filter('date')($scope.content.publicationDate, 'yyyy') + '}\n}';
                return bibTeX;
            };

            $scope.getCitation = function () {
                return $scope.computeTextCitation($scope);
            };

            $scope.getBibTeX = function () {
                return $scope.computeBibtexCitation($scope);
            };

            $scope.goToItem = function (url) {
                $location.url(url);
            };

            function initScopeVariables() {
                // Show info, browse, ...
                $scope.browse = false;
                $scope.isArray = angular.isArray;
                $scope.isString = angular.isString;
                $scope.marketItemTemplate = undefined;
                $scope.image = undefined;
                $scope.imgtitle = undefined;
                $scope.currentContent = $scope.content;
                $scope.showingDescription = false;
                $scope.handle = 'https://hdl.handle.net/' + url.handlePrefix + '/' + $scope.alias + ($scope.tag ? '/' + $scope.tag.name : '');
                $scope.dynamicHandle = 'https://hdl.handle.net/' + url.handlePrefix + '/' + $scope.alias;
                $scope.shortHandle = 'hdl:' + url.handlePrefix + '/' + $scope.alias + ($scope.tag ? '/' + $scope.tag.name : '');
            }

            $scope.howToCite = function ($scope, $event) {
                $event.preventDefault();
                var modalScope = Helper.createModalScope(true);
                modalScope.models = {
                    citation: $scope.computeTextCitation($scope),
                    bibTeX: $scope.computeBibtexCitation($scope),
                    isMac: window.navigator.appVersion.indexOf('Mac') !== -1
                };
                modalScope.select = function (target) {
                    if (target === 'bibtext') {
                        document.getElementById('citation-bibtex').select();
                    } else {
                        var text = document.getElementById('citation-text'),
                            range,
                            selection;
                        if (document.body.createTextRange) {
                            range = document.body.createTextRange();
                            range.moveToElementText(text);
                            range.select();
                        } else if (window.getSelection) {
                            selection = window.getSelection();
                            range = document.createRange();
                            range.selectNodeContents(text);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    }
                    modalScope.models.showCommands = true;
                };
                modalScope.$on('modal.show', function () {
                    var target = angular.element($event.target);
                    if (target.hasClass('label')) {
                        if (target.hasClass('bibtex')) {
                            modalScope.select('bibtext');
                        } else {
                            modalScope.select();
                        }
                    }
                });
                $modal({
                    scope: modalScope,
                    templateUrl: 'common/directives/citation-modal-template.html',
                    show: true
                });
            };

            $scope.contact = function () {
                var modalScope = Helper.createModalScope(true),
                    contactModal;

                if (User.email) {
                    modalScope.models.email = User.email;
                }

                modalScope.submit = function (contactForm) {
                    if (contactForm.$valid) {
                        WorkspaceResource.notifyOwner({wskey: $scope.wskey}, {subject: modalScope.models.subject, email: modalScope.models.email, message: modalScope.models.message}, function () {
                            contactModal.hide();
                        });
                    }
                };

                contactModal = $modal({
                    scope: modalScope,
                    templateUrl: 'market/templates/contact-modal-template.html',
                    show: true
                });
            };

            function init() {
                if ($scope.preview) {
                    $scope.content.social = {};
                }
                $scope.initilizing = true;
                initScopeVariables();
                loadItem();
                loadProducers();
                loadSponsors();
                loadContributors();
                loadLicense(Settings.language);
                $scope.initilizing = false;
            }

            $rootScope.$on('$translateChangeSuccess', function () {
                if ($scope.content) {
                    refreshMultilingualValue($scope.content, $translate.use());
                    loadLicense($translate.use());
                }
            });

            $scope.showPreview = function (key) {
                VisualizerService.showPreview(key);
            };

            $scope.backToSearch = function () {
                var history = $filter('orderBy')(Settings.searchHistory, '-date')[0];
                if (history) {
                    $location.path('/market/' + history.type);
                    $location.search(history.params);
                }
            };

            $scope.$watch('content', function (newContent) {
                if ($scope.content !== undefined && $scope.currentContent !== newContent) {
                    init();
                    $scope.currentContent = newContent;
                }
            });
        }]);
