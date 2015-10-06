'use strict';

/**
 * @ngdoc directive
 * @name ortolangMarketApp.directive:marketItemEditor
 * @description
 * # marketItemEditor
 * Directive of the ortolangMarketApp
 */
angular.module('ortolangMarketApp')
    .directive('marketItemEditor', ['$rootScope', '$translate', '$http', '$location', '$window', '$modal', '$anchorScroll', '$filter', 'ortolangType', 'url', 'WorkspaceElementResource', 'ObjectResource', 'QueryBuilderFactory', 'Settings', 'SearchResource', function ($rootScope, $translate, $http, $location, $window, $modal, $anchorScroll, $filter, ortolangType, url, WorkspaceElementResource, ObjectResource, QueryBuilderFactory, Settings, SearchResource) {
        return {
            restrict: 'EA',
            templateUrl: 'common/directives/market-item-editor.html',
            scope: {
                metadata: '=',
                workspace: '=',
                root: '=',
                togglePreviewing: '&',
                toggleEditing: '&',
                toggleCreating: '&',
                step: '='
            },
            link: {
                pre: function (scope) {

                    scope.submitForm = function () {
                        console.log('submit form');

                        if (scope.metadataItemform.$invalid) {
                            console.log('not ready');
                            return;
                        }

                        if(scope.metadata.preview.paths.length===0) {
                            delete scope.metadata.preview;
                        }

                        if(scope.publicationsModel.length>0) {
                            scope.metadata.publications = [];
                            angular.forEach(scope.publicationsModel, function(value) {
                                if(value.value!=='') {
                                    scope.metadata.publications.push({priority:'primary', value: value.value});
                                }
                            });
                            if(scope.metadata.publications.length===0) {
                                delete scope.metadata.publications;
                            }
                        }

                        scope.metadata.creationLocations = [];
                        angular.forEach(scope.selectedCreationLocations, function(tag) {
                            scope.metadata.creationLocations.push(tag.label);
                        });

                        scope.metadata.corporaStyles = [];
                        angular.forEach(scope.corporaStyleTag, function(tag) {
                            scope.metadata.corporaStyles.push(tag.id);
                        });

                        scope.metadata.annotationLevels = [];
                        angular.forEach(scope.selectedAnnotationLevels, function(tag) {
                            scope.metadata.annotationLevels.push(tag.id);
                        });

                        scope.metadata.corporaLanguages = [];
                        angular.forEach(scope.selectedCorporaLanguages, function(tag) {
                            scope.metadata.corporaLanguages.push(tag.id);
                        });

                        scope.metadata.corporaFormats = [];
                        angular.forEach(scope.selectedCorporaFormats, function(tag) {
                            scope.metadata.corporaFormats.push(tag.id);
                        });

                        scope.metadata.corporaFileEncodings = [];
                        angular.forEach(scope.selectedCorporaFileEncodings, function(tag) {
                            scope.metadata.corporaFileEncodings.push(tag.id);
                        });

                        scope.metadata.corporaDataTypes = [];
                        angular.forEach(scope.selectedCorporaDataTypes, function(tag) {
                            scope.metadata.corporaDataTypes.push(tag.id);
                        });

                        scope.metadata.lexiconInputLanguages = [];
                        angular.forEach(scope.selectedLexiconInputLanguages, function(tag) {
                            scope.metadata.lexiconInputLanguages.push(tag.id);
                        });

                        scope.metadata.lexiconDescriptionTypes = [];
                        angular.forEach(scope.selectedLexiconDescriptionTypes, function(tag) {
                            scope.metadata.lexiconDescriptionTypes.push(tag.id);
                        });

                        scope.metadata.lexiconDescriptionLanguages = [];
                        angular.forEach(scope.selectedLexiconDescriptionLanguages, function(tag) {
                            scope.metadata.lexiconDescriptionLanguages.push(tag.id);
                        });

                        scope.metadata.lexiconFormats = [];
                        angular.forEach(scope.selectedLexiconFormats, function(tag) {
                            scope.metadata.lexiconFormats.push(tag.id);
                        });

                        scope.metadata.programmingLanguages = [];
                        angular.forEach(scope.selectedProgrammingLanguages, function(tag) {
                            scope.metadata.programmingLanguages.push(tag.id);
                        });

                        scope.metadata.operatingSystems = [];
                        angular.forEach(scope.selectedOperatingSystems, function(tag) {
                            scope.metadata.operatingSystems.push(tag.id);
                        });

                        scope.metadata.toolFunctionalities = [];
                        angular.forEach(scope.selectedToolFunctionalities, function(tag) {
                            scope.metadata.toolFunctionalities.push(tag.id);
                        });

                        scope.metadata.toolInputData = [];
                        angular.forEach(scope.selectedToolInputData, function(tag) {
                            scope.metadata.toolInputData.push(tag.id);
                        });

                        scope.metadata.toolOutputData = [];
                        angular.forEach(scope.selectedToolOutputData, function(tag) {
                            scope.metadata.toolOutputData.push(tag.id);
                        });

                        scope.metadata.toolLanguages = [];
                        angular.forEach(scope.selectedToolLanguages, function(tag) {
                            scope.metadata.toolLanguages.push(tag.id);
                        });

                        scope.metadata.navigationLanguages = [];
                        angular.forEach(scope.selectedNavigationLanguages, function(tag) {
                            scope.metadata.navigationLanguages.push(tag.id);
                        });

                        scope.metadata.toolFileEncodings = [];
                        angular.forEach(scope.selectedToolFileEncodings, function(tag) {
                            scope.metadata.toolFileEncodings.push(tag.id);
                        });

                        scope.metadata.publicationDate = $filter('date')(new Date(), 'yyyy-MM-dd');

                        for(var propertyName in scope.metadata) {
                            if(scope.metadata[propertyName].length===0) {
                                delete scope.metadata[propertyName];
                            }
                        }

                        var content = angular.toJson(scope.metadata),
                            contentType = 'text/json';

                        sendForm(content, contentType);
                    };


                    function sendForm(content, contentType) {

                        var uploadUrl = url.api + '/workspaces/' + (scope.selectedElements ? scope.selectedElements[0].workspace : scope.workspace.key) + '/elements/',
                            fd = new FormData(),
                            currentPath = scope.selectedElements ? scope.selectedElements[0].path : '/';

                        fd.append('path', currentPath);
                        fd.append('type', ortolangType.metadata);

                        // fd.append('format', scope.userMetadataFormat.key);
                        fd.append('name', 'ortolang-item-json');

                        var blob = new Blob([content], { type: contentType});

                        fd.append('stream', blob);

                        $http.post(uploadUrl, fd, {
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined}
                        })
                            .success(function () {

                                console.log('submit form success');
                                // scope.hideEditor();
                                // resetMetadataFormat();
                                // scope.refreshSelectedElement();
                                if(scope.step) {
                                    scope.toggleCreating();
                                    scope.togglePreviewing();
                                } else {
                                    scope.toggleEditing();
                                }

                            })
                            .error(function (error) {
                                console.error('creation of metadata failed !', error);
                                // scope.hideEditor();
                                // resetMetadataFormat();
                            });
                    }

                    scope.selectType = function () {
                        scope.metadata.type = scope.selectedType.key;
                    };

                    scope.selectStatusOfUse = function () {
                        scope.metadata.statusOfUse = scope.selectedStatusOfUse.key;
                    };

                    scope.selectCorporaType = function () {
                        scope.metadata.corporaType = scope.metadataItemform.corporaLanguageType.$modelValue.key;
                    };

                    scope.selectCorporaLanguageType = function () {
                        scope.metadata.corporaLanguageType = scope.metadataItemform.corporaLanguageType.$modelValue.key;
                    };

                    scope.nextStep = function() {
                        if(scope.stepCurrent==='basic_info') {
                            scope.stepBasicInfoSuccess = stepBasicInfoSuccess();
                            if(scope.stepBasicInfoSuccess) {
                                scope.stepCurrent = 'whos_involved';
                            }
                        } else if(scope.stepCurrent==='whos_involved') {
                            scope.stepWhosInvolvedSuccess = stepWhosInvolvedSuccess();
                            if(scope.stepWhosInvolvedSuccess) {
                                scope.stepCurrent = 'describe';
                            }
                        } else if(scope.stepCurrent==='describe') {
                            scope.stepDescribeSuccess = stepDescribeSuccess();
                            if(scope.stepDescribeSuccess) {
                                scope.stepCurrent = 'licence';
                                scope.scrolltoHref('licence');
                            }
                        } else if(scope.stepCurrent==='licence') {
                            scope.stepLicenceSuccess = stepLicenceSuccess();
                            if(scope.stepLicenceSuccess) {
                                scope.stepCurrent = 'specific_fields';
                                scope.scrolltoHref('specific_fields');
                            }
                        } else if(scope.stepCurrent==='specific_fields') {
                            scope.submitForm();
                        }
                    };

                    function stepBasicInfoSuccess() {
                        if(scope.metadataItemform.type.$valid && scope.metadataItemform.title.$valid && scope.metadataItemform.langtitle.$valid) {
                            return true;
                        } else {
                            scope.metadataItemform.type.$dirty = true;
                            scope.metadataItemform.title.$dirty = true;
                            return false;
                        }
                    }

                    function stepWhosInvolvedSuccess() {
                        if(scope.metadata.contributors.length>0) {
                            return true;
                        }
                        return false;
                    }

                    function stepDescribeSuccess() {
                        if(scope.metadataItemform.description.$valid && scope.metadataItemform.langdescription.$valid) {
                            return true;
                        } else {
                            scope.metadataItemform.description.$dirty = true;
                            return false;
                        }
                    }

                    function stepLicenceSuccess() {
                        if(scope.metadataItemform.statusOfUse.$valid) {
                            return true;
                        } else {
                            scope.metadataItemform.statusOfUse.$dirty = true;
                            return false;
                        }
                    }

                    var deregisterFileLicenceSelectModal = $rootScope.$on('browserSelectedElements-fileLicenceSelectModal', function ($event, elements) {
                        console.log('metadata-form-market-ortolang caught event "browserSelectedElements-fileLicenceSelectModal" (selected elements: %o)', elements);

                        scope.metadata.license = elements[0].path;
                        scope.license = elements[0];
                        scope.fileLicenceSelectModal.hide();
                    });

                    var deregisterFileImageSelectModal = $rootScope.$on('browserSelectedElements-fileImageSelectModal', function ($event, elements) {
                        console.log('metadata-form-market-ortolang caught event "browserSelectedElements-fileImageSelectModal" (selected elements: %o)', elements);

                        scope.metadata.image = elements[0].path;
                        scope.image = elements[0];
                        scope.fileImageSelectModal.hide();
                    });

                    scope.$on('$destroy', function () {
                        deregisterFileLicenceSelectModal();
                        deregisterFileImageSelectModal();
                        angular.element($window).unbind('resize.' + scope.$id);
                    });


                    // ScrollSpy //

                    scope.scrolltoHref = function (id) {
                        // set the location.hash to the id of
                        // the element you wish to scroll to.
                        $location.hash(id);
                        // call $anchorScroll()
                        $anchorScroll();
                    };

                    // *********************** //
                    //          Resize         //
                    // *********************** //

                    scope.resizeMetadataItemEditor = function () {
                        var topNavWrapper = angular.element('.top-nav'),
                            topOffset = topNavWrapper.outerHeight(),
                            height = (window.innerHeight > 0) ? window.innerHeight : screen.height,
                            browserToolbarHeight = angular.element('#metadata-item-editor-toolbar').innerHeight();

                        height = height - topOffset;
                        if (height < 1) {
                            height = 1;
                        }
                        if (height > topOffset) {
                            height -= 1;

                            var editorWrapper = angular.element('.metadata-item-editor'),
                                editorAside = angular.element('.editor-aside'),
                                editorStepHeight = angular.element('.metadata-editor-progress-bar').innerHeight();

                            editorAside.css('min-height', (height - browserToolbarHeight) + 'px');
                            editorWrapper.find('.editor-pane').css('height', (height - browserToolbarHeight - editorStepHeight) + 'px');
                        }
                    };

                    angular.element($window).bind('resize.' + scope.$id, function () {
                        scope.resizeMetadataItemEditor();
                    });


                    /**
                     * Utils
                     **/
                    scope.suggestLanguages = function (query) {
                        var result = $filter('filter')(scope.allLanguages, {label:query});
                        return result;
                    };

                    scope.suggestCountries = function (query) {
                        var result = $filter('filter')(scope.allCountries, {label:query});
                        return result;
                    };

                    function loadAllCountries() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'Country');

                        var query = queryBuilder.toString();
                        scope.allCountries = [];
                        SearchResource.json({query: query}).$promise.then(function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allCountries.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.creationLocations)) {

                                angular.forEach(scope.metadata.creationLocations, function(tag) {
                                    var tagFound = $filter('filter')(scope.allCountries, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedCreationLocations.push(tagFound[0]);
                                    } else {
                                        scope.selectedCreationLocations.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllCorporaTypes() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'CorporaType');

                        var query = queryBuilder.toString();
                        scope.allCorporaType = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var role = angular.fromJson(result);

                                scope.allCorporaType.push({key: role.id, value: role.label});
                            });

                            if(angular.isDefined(scope.metadata.corporaType)) {

                                var corporaTypeFound = $filter('filter')(scope.allCorporaType, {key:scope.metadata.corporaType});
                                if(corporaTypeFound.length>0) {
                                    scope.selectedCorporaType = corporaTypeFound[0];
                                }
                            }

                        });
                    }

                    function loadAllCorporaLanguageType() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'CorporaLanguageType');

                        var query = queryBuilder.toString();
                        scope.allCorporaLanguageType = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allCorporaLanguageType.push({key: term.id, value: term.label});
                            });

                            if(angular.isDefined(scope.metadata.corporaLanguageType)) {

                                var corporaLanguageTypeFound = $filter('filter')(scope.allCorporaLanguageType, {key:scope.metadata.corporaLanguageType});
                                if(corporaLanguageTypeFound.length>0) {
                                    scope.selectedCorporaLanguageType = corporaLanguageTypeFound[0];
                                }
                            }

                        });
                    }

                    function loadAllCorporaStyles() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'CorporaStyle');

                        var query = queryBuilder.toString();
                        scope.allCorporaStyles = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allCorporaStyles.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.corporaStyles)) {

                                angular.forEach(scope.metadata.corporaStyles, function(tag) {
                                    var tagFound = $filter('filter')(scope.allCorporaStyles, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.corporaStyleTag.push(tagFound[0]);
                                    } else {
                                        scope.corporaStyleTag.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllAnnotationLevels() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'AnnotationLevel');

                        var query = queryBuilder.toString();
                        scope.allAnnotationLevels = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allAnnotationLevels.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.annotationLevels)) {

                                angular.forEach(scope.metadata.annotationLevels, function(tag) {
                                    var tagFound = $filter('filter')(scope.allAnnotationLevels, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedAnnotationLevels.push(tagFound[0]);
                                    } else {
                                        scope.selectedAnnotationLevels.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllCorporaFormats() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'CorporaFormat');

                        var query = queryBuilder.toString();
                        scope.allCorporaFormats = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allCorporaFormats.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.corporaFormats)) {

                                angular.forEach(scope.metadata.corporaFormats, function(tag) {
                                    var tagFound = $filter('filter')(scope.allCorporaFormats, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedCorporaFormats.push(tagFound[0]);
                                    } else {
                                        scope.selectedCorporaFormats.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllCorporaFileEncodings() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'CorporaFileEncoding');

                        var query = queryBuilder.toString();
                        scope.allCorporaFileEncodings = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allCorporaFileEncodings.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.corporaFileEncodings)) {

                                angular.forEach(scope.metadata.corporaFileEncodings, function(tag) {
                                    var tagFound = $filter('filter')(scope.allCorporaFileEncodings, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedCorporaFileEncodings.push(tagFound[0]);
                                    } else {
                                        scope.selectedCorporaFileEncodings.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllCorporaDataTypes() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'CorporaDataType');

                        var query = queryBuilder.toString();
                        scope.allCorporaDataTypes = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allCorporaDataTypes.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.corporaDataTypes)) {

                                angular.forEach(scope.metadata.corporaDataTypes, function(tag) {
                                    var tagFound = $filter('filter')(scope.allCorporaDataTypes, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedCorporaDataTypes.push(tagFound[0]);
                                    } else {
                                        scope.selectedCorporaDataTypes.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllLanguages() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'Language');

                        var query = queryBuilder.toString();
                        scope.allLanguages = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allLanguages.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.corporaLanguages)) {

                                angular.forEach(scope.metadata.corporaLanguages, function(tag) {
                                    var tagFound = $filter('filter')(scope.allLanguages, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedCorporaLanguages.push(tagFound[0]);
                                    } else {
                                        scope.selectedCorporaLanguages.push({id:tag,label:tag});
                                    }
                                });
                            }

                            if(angular.isDefined(scope.metadata.toolLanguages)) {

                                angular.forEach(scope.metadata.toolLanguages, function(tag) {
                                    var tagFound = $filter('filter')(scope.allLanguages, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedToolLanguages.push(tagFound[0]);
                                    } else {
                                        scope.selectedToolLanguages.push({id:tag,label:tag});
                                    }
                                });
                            }

                            if(angular.isDefined(scope.metadata.navigationLanguages)) {

                                angular.forEach(scope.metadata.navigationLanguages, function(tag) {
                                    var tagFound = $filter('filter')(scope.allLanguages, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedNavigationLanguages.push(tagFound[0]);
                                    } else {
                                        scope.selectedNavigationLanguages.push({id:tag,label:tag});
                                    }
                                });
                            }

                            if(angular.isDefined(scope.metadata.lexiconInputLanguages)) {

                                angular.forEach(scope.metadata.lexiconInputLanguages, function(tag) {
                                    var tagFound = $filter('filter')(scope.allLanguages, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedLexiconInputLanguages.push(tagFound[0]);
                                    } else {
                                        scope.selectedLexiconInputLanguages.push({id:tag,label:tag});
                                    }
                                });
                            }

                            if(angular.isDefined(scope.metadata.lexiconDescriptionLanguages)) {

                                angular.forEach(scope.metadata.lexiconDescriptionLanguages, function(tag) {
                                    var tagFound = $filter('filter')(scope.allLanguages, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedLexiconDescriptionLanguages.push(tagFound[0]);
                                    } else {
                                        scope.selectedLexiconDescriptionLanguages.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllLexiconInputTypes() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'LexiconInputType');

                        var query = queryBuilder.toString();
                        scope.allLexiconInputTypes = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allLexiconInputTypes.push({key: term.id, value: term.label});
                            });

                            if(angular.isDefined(scope.metadata.lexiconInputType)) {

                                var lexiconInputTypeFound = $filter('filter')(scope.allLexiconInputTypes, {key:scope.metadata.lexiconInputType});
                                if(lexiconInputTypeFound.length>0) {
                                    scope.selectedlexiconInputType = lexiconInputTypeFound[0];
                                }
                            }

                        });
                    }

                    function loadAllLexiconDescriptionTypes() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'LexiconDescriptionType');

                        var query = queryBuilder.toString();
                        scope.allLexiconDescriptionTypes = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allLexiconDescriptionTypes.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.lexiconDescriptionTypes)) {

                                angular.forEach(scope.metadata.lexiconDescriptionTypes, function(tag) {
                                    var tagFound = $filter('filter')(scope.allLexiconDescriptionTypes, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedLexiconDescriptionTypes.push(tagFound[0]);
                                    } else {
                                        scope.selectedLexiconDescriptionTypes.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllLexiconLanguageTypes() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'LexiconLanguageType');

                        var query = queryBuilder.toString();
                        scope.allLexiconLanguageTypes = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allLexiconLanguageTypes.push({key: term.id, value: term.label});
                            });

                            // if(angular.isDefined(scope.metadata.lexiconLanguageType)) {

                            //     var lexiconLanguageTypeFound = $filter('filter')(scope.allLexiconLanguageTypes, {key:scope.metadata.lexiconLanguageType});
                            //     if(lexiconLanguageTypeFound.length>0) {
                            //         scope.selectedLexiconLanguageType = lexiconLanguageTypeFound[0];
                            //     }
                            // }

                        });
                    }

                    function loadAllLexiconFormats() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'LexiconFormat');

                        var query = queryBuilder.toString();
                        scope.allLexiconFormats = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allLexiconFormats.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.lexiconFormats)) {

                                angular.forEach(scope.metadata.lexiconFormats, function(tag) {
                                    var tagFound = $filter('filter')(scope.allLexiconFormats, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedLexiconFormats.push(tagFound[0]);
                                    } else {
                                        scope.selectedLexiconFormats.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllProgrammingLanguages() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'ProgrammingLanguage');

                        var query = queryBuilder.toString();
                        scope.allProgrammingLanguages = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allProgrammingLanguages.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.programmingLanguages)) {

                                angular.forEach(scope.metadata.programmingLanguages, function(tag) {
                                    var tagFound = $filter('filter')(scope.allProgrammingLanguages, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedProgrammingLanguages.push(tagFound[0]);
                                    } else {
                                        scope.selectedProgrammingLanguages.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllOperatingSystems() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'OperatingSystem');

                        var query = queryBuilder.toString();
                        scope.allOperatingSystems = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allOperatingSystems.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.operatingSystems)) {

                                angular.forEach(scope.metadata.operatingSystems, function(tag) {
                                    var tagFound = $filter('filter')(scope.allOperatingSystems, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedOperatingSystems.push(tagFound[0]);
                                    } else {
                                        scope.selectedOperatingSystems.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllToolSupports() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'ToolSupport');

                        var query = queryBuilder.toString();
                        scope.allToolSupports = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allToolSupports.push({id: term.id, label: term.label});
                            });

                        });
                    }
                    function loadAllToolFunctionalities() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'ToolFunctionality');

                        var query = queryBuilder.toString();
                        scope.allToolFunctionalities = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allToolFunctionalities.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.toolFunctionalities)) {

                                angular.forEach(scope.metadata.toolFunctionalities, function(tag) {
                                    var tagFound = $filter('filter')(scope.allToolFunctionalities, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedToolFunctionalities.push(tagFound[0]);
                                    } else {
                                        scope.selectedToolFunctionalities.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllToolInputData() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'ToolInputData');

                        var query = queryBuilder.toString();
                        scope.allToolInputData = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allToolInputData.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.toolInputData)) {

                                angular.forEach(scope.metadata.toolInputData, function(tag) {
                                    var tagFound = $filter('filter')(scope.allToolInputData, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedToolInputData.push(tagFound[0]);
                                    } else {
                                        scope.selectedToolInputData.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllToolOutputData() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'ToolOutputData');

                        var query = queryBuilder.toString();
                        scope.allToolOutputData = [];
                        SearchResource.json({query: query}, function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allToolOutputData.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.toolOutputData)) {

                                angular.forEach(scope.metadata.toolOutputData, function(tag) {
                                    var tagFound = $filter('filter')(scope.allToolOutputData, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedToolOutputData.push(tagFound[0]);
                                    } else {
                                        scope.selectedToolOutputData.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllToolFileEncodings() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'ToolFileEncoding');

                        var query = queryBuilder.toString();
                        scope.allToolFileEncodings = [];
                        SearchResource.json({query: query}).$promise.then(function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allToolFileEncodings.push({id: term.id, label: term.label});
                            });

                            if(angular.isDefined(scope.metadata.toolFileEncodings)) {

                                angular.forEach(scope.metadata.toolFileEncodings, function(tag) {
                                    var tagFound = $filter('filter')(scope.allToolFileEncodings, {id:tag});
                                    if(tagFound.length>0) {
                                        scope.selectedToolFileEncodings.push(tagFound[0]);
                                    } else {
                                        scope.selectedToolFileEncodings.push({id:tag,label:tag});
                                    }
                                });
                            }

                        });
                    }

                    function loadAllResourceType() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'ResourceType');

                        var query = queryBuilder.toString();
                        scope.allResourceType = [];
                        SearchResource.json({query: query}).$promise.then(function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allResourceType.push({key: term.id, value: term.label});
                            });

                            if(angular.isDefined(scope.metadata.type)) {

                                var typeFound = $filter('filter')(scope.allResourceType, {key:scope.metadata.type});
                                if(typeFound.length>0) {
                                    scope.selectedType = typeFound[0];
                                }
                            }

                        });
                    }

                    function loadAllStatusOfUse() {

                        var queryBuilder = QueryBuilderFactory.make({
                            projection: 'key, meta_ortolang-referentiel-json',
                            source: 'ReferentielEntity'
                        });

                        // queryBuilder.addProjection('meta_ortolang-referentiel-json.id', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang=fr].value', 'id');
                        queryBuilder.addProjection('meta_ortolang-referentiel-json.labels[lang='+Settings.language+'].value', 'label');

                        queryBuilder.equals('meta_ortolang-referentiel-json.type', 'StatusOfUse');

                        var query = queryBuilder.toString();
                        scope.allStatusOfUse = [];
                        SearchResource.json({query: query}).$promise.then(function (jsonResults) {
                            angular.forEach(jsonResults, function (result) {
                                var term = angular.fromJson(result);

                                scope.allStatusOfUse.push({key: term.id, value: term.label});
                            });

                            if(angular.isDefined(scope.metadata.statusOfUse)) {

                                var statusOfUseFound = $filter('filter')(scope.allStatusOfUse, {key:scope.metadata.statusOfUse});
                                if(statusOfUseFound.length>0) {
                                    scope.selectedStatusOfUse = statusOfUseFound[0];
                                }
                            }

                        });
                    }

                    function init() {
                        if(!angular.isDefined(scope.metadata)) {
                            scope.metadata = {schema: 'http://www.ortolang.fr/schema/012#', contributors:[]};
                        }

                        ObjectResource.size({key: scope.workspace.head}, function (data) {
                            scope.metadata.datasize = data.size.toString();
                        });

                        var fileLicenceSelectModalScope = $rootScope.$new();
                        fileLicenceSelectModalScope.acceptMultiple = false;
                        fileLicenceSelectModalScope.forceMimeTypes = ['ortolang/collection', 'text'];
                        fileLicenceSelectModalScope.forceWorkspace = scope.workspace.key;
                        fileLicenceSelectModalScope.forceHead = true;
                        fileLicenceSelectModalScope.fileSelectId = 'fileLicenceSelectModal';
                        scope.fileLicenceSelectModal = $modal({scope: fileLicenceSelectModalScope, title: 'File select', template: 'common/directives/file-select-modal-template.html', show: false});

                        if(angular.isDefined(scope.metadata.license)) {

                            WorkspaceElementResource.get({path: scope.metadata.license, wskey: scope.workspace.key, root: scope.root}).$promise.then(function (data) {
                                scope.license = data;
                            });
                        }

                        var fileImageSelectModalScope = $rootScope.$new();
                        fileImageSelectModalScope.acceptMultiple = false;
                        fileImageSelectModalScope.forceMimeTypes = ['ortolang/collection', 'image'];
                        fileImageSelectModalScope.forceWorkspace = scope.workspace.key;
                        fileImageSelectModalScope.forceHead = true;
                        fileImageSelectModalScope.fileSelectId = 'fileImageSelectModal';
                        scope.fileImageSelectModal = $modal({scope: fileImageSelectModalScope, title: 'File select', template: 'common/directives/file-select-modal-template.html', show: false});

                        if(angular.isDefined(scope.metadata.image)) {

                            WorkspaceElementResource.get({path: scope.metadata.image, wskey: scope.workspace.key, root: scope.root}).$promise.then(function (data) {
                                scope.image = data;
                            });
                        }

                        if(angular.isUndefined(scope.metadata.preview)) {
                            scope.metadata.preview = {type: 'line', paths:[]};
                        }

                        scope.publicationsModel = [];
                        if(angular.isDefined(scope.metadata.publications) && scope.metadata.publications.length>0) {
                            angular.forEach(scope.metadata.publications, function(publication) {
                                scope.publicationsModel.push({value:publication.value});
                            });
                        }


                        scope.selectedCreationLocations = [];
                        scope.corporaStyleTag = [];
                        scope.selectedAnnotationLevels = [];
                        scope.selectedCorporaFormats = [];
                        scope.selectedCorporaFileEncodings = [];
                        scope.selectedCorporaDataTypes = [];
                        scope.selectedCorporaLanguages = [];
                        scope.selectedLexiconInputLanguages = [];
                        scope.selectedLexiconDescriptionTypes = [];
                        scope.selectedLexiconDescriptionLanguages = [];
                        scope.selectedLexiconFormats = [];
                        scope.selectedProgrammingLanguages = [];
                        scope.selectedOperatingSystems = [];
                        scope.selectedToolFunctionalities = [];
                        scope.selectedToolInputData = [];
                        scope.selectedToolOutputData = [];
                        scope.selectedToolFileEncodings = [];
                        scope.selectedToolLanguages = [];
                        scope.selectedNavigationLanguages = [];

                        loadAllCountries();
                        loadAllResourceType();
                        loadAllStatusOfUse();
                        loadAllCorporaTypes();
                        loadAllCorporaStyles();
                        loadAllLanguages();
                        loadAllCorporaLanguageType();
                        loadAllAnnotationLevels();
                        loadAllCorporaFormats();
                        loadAllCorporaFileEncodings();
                        loadAllCorporaDataTypes();
                        loadAllLexiconInputTypes();
                        loadAllLexiconDescriptionTypes();
                        loadAllLexiconLanguageTypes();
                        loadAllLexiconFormats();
                        loadAllProgrammingLanguages();
                        loadAllOperatingSystems();
                        loadAllToolSupports();
                        loadAllToolFunctionalities();
                        loadAllToolInputData();
                        loadAllToolOutputData();
                        loadAllToolFileEncodings();

                        scope.stepCurrent = 'basic_info';
                        scope.stepBasicInfoSuccess = false;
                        scope.stepWhosInvolvedSuccess = false;
                        scope.stepDescribeSuccess = false;
                        scope.stepLicenceSuccess = false;
                    }
                    init();
                }
            }
        };
    }]);
