'use strict';

/**
 * @ngdoc constant
 * @name ortolangMarketApp.icons
 * @description
 * # icons
 * Constant in the ortolangMarketApp.
 */
angular.module('ortolangMarketApp')
    .constant('icons',
        {
            // Files & folder
            folder: 'fa fa-fw fa-folder-o',
            folderPlain: 'fa fa-fw fa-folder',
            folderOpen: 'fa fa-fw fa-folder-open-o',
            folderOpenPlain: 'fa fa-fw fa-folder-open',
            file: 'fa fa-fw fa-file-o',
            files: 'fa fa-fw fa-files-o',
            textFile: 'fa fa-fw fa-file-text-o',
            codeFile: 'fa fa-fw fa-file-code-o',
            imageFile: 'fa fa-fw fa-file-image-o',
            audioFile: 'fa fa-fw fa-file-audio-o',
            videoFile: 'fa fa-fw fa-file-video-o',
            pdfFile: 'fa fa-fw fa-file-pdf-o',
            archiveFile: 'fa fa-fw fa-file-archive-o',
            officeWordFile: 'fa fa-fw fa-file-word-o',
            officeExcelFile: 'fa fa-fw fa-file-excel-o',
            officePowerpointFile: 'fa fa-fw fa-file-powerpoint-o',
            trash: 'glyphicon glyphicon-trash',
            check: 'fa fa-fw fa-check',
            square: 'fa fa-fw fa-square-o',
            plus: 'glyphicon glyphicon-plus',
            minus: 'glyphicon glyphicon-minus',
            play: 'fa fa-fw fa-play',
            tag: 'fa fa-fw fa-tag',
            cart: 'fa fa-fw fa-shopping-cart',
            cartPlus: 'fa fa-shopping-cart',
            // Ortolang elements
            ortolang: {
                collection: 'glyphicon glyphicon-folder-close',
                object: 'glyphicon glyphicon-file',
                metadata: 'glyphicon glyphicon-list-alt',
                unknown: 'glyphicon glyphicon-minus'
            },
            // Visibility
            everybody: 'fa fa-fw fa-globe',
            friends: 'fa fa-fw fa-users',
            nobody: 'fa fa-fw fa-lock',
            // Browser
            browser: {
                home: 'glyphicon glyphicon-home',
                viewModeTile: 'glyphicon glyphicon-th-large',
                viewModeLine: 'glyphicon glyphicon-align-justify',
                download: 'glyphicon glyphicon-download',
                upload: 'glyphicon glyphicon-upload',
                uploadZip: 'glyphicon glyphicon-compressed',
                uploadToWorkspace: 'glyphicon glyphicon-cloud-upload',
                delete: 'glyphicon glyphicon-trash',
                remove: 'glyphicon glyphicon-remove',
                edit: 'glyphicon glyphicon-pencil',
                move: 'fa fa-folder',
                preview: 'glyphicon glyphicon-eye-open',
                search: 'glyphicon glyphicon-search',
                sort: 'glyphicon glyphicon-sort',
                metadata: 'glyphicon glyphicon-list',
                info: 'glyphicon glyphicon-info-sign',
                workspaceList: 'glyphicon glyphicon-th-list',
                publish: 'glyphicon glyphicon-ok',
                snapshot: 'glyphicon glyphicon-floppy-disk',
                history: 'glyphicon glyphicon-time',
                published: 'glyphicon glyphicon-ok',
                shortcuts: 'glyphicon glyphicon-question-sign',
                tools: 'fa fa-fw fa-cube',
                settings: 'glyphicon glyphicon-cog',
                members: 'fa fa-fw fa-users',
                workspace: 'glyphicon glyphicon-book',
                browse: 'glyphicon glyphicon-th',
                back: 'glyphicon glyphicon-arrow-left',
                forward: 'glyphicon glyphicon-arrow-right',
                backToDashboard: 'glyphicon glyphicon-triangle-left',
                others: 'fa fa-fw fa-ellipsis-v',
                keyboard: 'fa fa-fw fa-keyboard-o'
            }
        });
