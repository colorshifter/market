'use strict';

/**
 * @ngdoc service
 * @name ortolangMarketApp.BROWSER_FR
 * @description
 * # BROWSER_FR
 * Constant in the ortolangMarketApp.
 */
angular.module('ortolangMarketApp')
    .constant('BROWSER_FR', {
        BROWSER: {
            MY_WORKSPACES: 'Mes espaces',
            NEW: 'Nouveau',
            WORKSPACE: 'Espace de travail',
            COLLECTION: 'Dossier',
            INFORMATION: 'Informations',
            METADATA: 'Métadonnées',
            DESCRIPTION: 'Description',
            NO_DESCRIPTION_PROVIDED: 'Ajouter une description',
            AUTHOR: 'Auteur',
            CREATION: 'Création',
            MODIFICATION: 'Modification',
            LAST_MODIFICATION: 'Dernière modification',
            CLOCK: 'Horloge',
            KEY: 'Clé',
            ELEMENT: '{{value}} élement{{value > 1 ? "s" : ""}}',
            ELEMENT_WITH_SIZE: '{{value}} élement{{value > 1 ? "s" : ""}}<br/>({{size | bytes}})',
            FULL_SIZE: '{{size.elementNumber}} élement{{elementNumber > 1 ? "s" : ""}}<br/>({{size.collectionNumber > 0 ? "au moins " : ""}}{{size.value | bytes}})',
            CALCULATE_SIZE: '(calculer)',
            VIEW_MODE_TILE: 'Mode grille',
            VIEW_MODE_LINE: 'Mode liste',
            SORT_BY: 'Trier par',
            FILTER: {
                FILTER: 'Filtrer',
                MIME_TYPE: 'Type Mime'
            },
            SORT: {
                MIME_TYPE: 'Type Mime',
                DATE: 'Date de modification'
            },
            INFO: '{{hideInfo === "true" ? "Afficher" : "Masquer"}} les détails',
            DASHBOARD: 'Retourner au tableau de bord',
            WORKSPACE_LIST: '{{hideWorkspaceList === "true" ? "Afficher" : "Masquer"}} la liste des espaces de travail',
            SETTINGS: 'Paramètres',
            PREVIEW: 'Visualiser',
            DELETE: 'Supprimer',
            UPLOAD: 'Importer',
            UPLOAD_FILES: 'Importer des fichiers',
            UPLOAD_ZIP: 'Importer un zip',
            UPLOAD_FOLDER: 'Importer un dossier',
            NEW_COLLECTION: 'Nouveau dossier',
            PREVIEW_WORKSPACE: 'Aperçu avant publication',
            VERSION: 'Versions de l\'espace de travail',
            HEAD: 'Version actuelle',
            PREVIOUS_VERSIONS: 'Versions précédentes',
            BACK: 'Revenir',
            FORWARD: 'Avancer',
            TOGGLE_DROPDOWN: 'Menu déroulant',
            COPY_TO_CLIPBOARD: 'Copier',
            NO_PREVIOUS_VERSIONS: 'Pas de version encore crée',
            TOOLS: 'Outils',
            DRAFT: 'Non publié',
            PUBLISHED: 'Publié',
            CREATED: '{{author}} a créé',
            SHORTCUTS: {
                SHORTCUTS: 'Raccourcis clavier',
                FILTER: 'Filtrer les éléments',
                UP: 'Naviguer vers le haut',
                DOWN: 'Naviguer vers le bas',
                BACKSPACE: 'Revenir en arrière',
                VIEW_MODE: 'Changer de mode de vue (liste/grille)',
                SELECT_ALL: 'Tout selectionner',
                ENTER: 'Visualiser / Ouvrir le dossier',
                NEW_COLLECTION: 'Nouveau dossier',
                DELETE: 'Supprimer les éléments sélectionnés',
                INFO: 'Afficher / Masquer les détails',
                WORKSPACE_LIST: 'Afficher / Masquer la liste des espaces de travail'
            },
            NO_PREVIEW: 'Aucun aperçu n\'est disponible pour ce type de fichier',
            WORKSPACE_KEY: 'Copier la clé du workspace',
            BEARER_TOKEN: 'Copier le token',
            SEE_ALL: 'Voir tous les fichiers'
        }
    });
