'use strict';

/**
 * @ngdoc service
 * @name ortolangMarketApp.PROFILE_FR
 * @description
 * # PROFILE_FR
 * Constant in the ortolangMarketApp.
 */
angular.module('ortolangMarketApp')
    .constant('PROFILE_FR', {
        PROFILE: {
            EMPTY: 'non renseigné',
            NAV: {
                PERSONAL_INFOS: 'Informations personnelles',
                SETTINGS: 'Préférences',
                ABOUT_ME: 'A propos de moi',
                EVENTS: 'Activité récente',
                PUBLICATIONS: 'Publications',
                CONTRIBUTIONS: 'Contributions',
                FRIENDS: 'Collaborateurs'
            },
            PATH: {
                PERSONAL_INFOS: 'profile/personal-infos.html',
                SETTINGS: 'profile/settings.html',
                ABOUT_ME: 'profile/about-me.html',
                EVENTS: 'profile/fr/events.html',
                PUBLICATIONS: 'profile/fr/publications.html',
                CONTRIBUTIONS: 'profile/fr/contributions.html',
                FRIENDS: 'profile/fr/friends.html'
            },
            VISIBILITY: {
                LABEL: 'Visibilité de l\'information :',
                EVERYBODY: 'Public',
                FRIENDS: 'Amis uniquement',
                NOBODY: 'Moi uniquement'
            },
            CIVILITY: {
                MISTER: 'Monsieur',
                MISSUS: 'Madame'
            },
            INFOS: {
                CIVILITY: 'Civilité',
                TITLE: 'Titre professionnel',
                GIVEN_NAME: 'Prénom',
                FAMILY_NAME: 'Nom',
                ORGANISATION: 'Organisme',
                JOB: 'Métier ou occupation',
                FIELD_OF_RESEARCH: 'Domaine de recherche',
                ADDRESS: 'Adresse',
                ADDRESS_ERROR: 'Veuillez selectionner une adresse parmi les propositions',
                WEBSITE: 'Site web',
                PROFESSIONAL_EMAIL: 'E-mail professionnel',
                RESCUE_EMAIL: 'E-mail de secours',
                PROFESSIONAL_TEL: 'Téléphone professionnel',
                TEL: 'Téléphone personnel',
                FAX: 'Fax'
            },
            ABOUTME: {
                PRESENTATION: 'Décrivez-vous en quelques mots'
            },
            SETTINGS: {
                AVATAR: 'Avatar',
                DEFAULT_AVATAR: 'Avatar par défaut',
                ORCID: 'Identifiant ORCID',
                VIAF: 'Identifiant VIAF',
                MYIDREF: 'IdRef',
                LINKEDIN: 'Page Linkedin',
                VIADEO: 'Identifiant Viadeo',
                LANGUAGE: 'Langue d\'interface préférée',
                FACEBOOK: 'Identifiant Facebook',
                GITHUB: 'Identifiant Github',
                GRAVATAR: 'Identifiant Gravatar'
            },
            HELPER: {
                INFOS: {
                    TITLE: 'Titre professionnel : Dr., Prof. etc.'
                },
                SETTINGS: {
                    ORCID: 'Identifiant personnel pérenne : <a href="http://orcid.org/" target="_blank">http://orcid.org/</a>',
                    VIAF: 'Identifiant personnel pérenne : <a href="http://viaf.org/viaf/" target="_blank">http://viaf.org/viaf/</a>',
                    MYIDREF: 'Identifiant personnel pérenne : <a href="http://www.idref.fr/" target="_blank">http://www.idref.fr/</a>',
                    LINKEDIN: 'Identifiant personnel pérenne : <a href="http://www.linkedin.com/" target="_blank">http://www.linkedin.com/</a>',
                    VIADEO: 'Identifiant personnel pérenne : <a href="http://www.viadeo.com/profile/" target="_blank">http://www.viadeo.com/profile/</a>',
                    FACEBOOK: 'Pour obtenir votre identifiant facebook, visitez ce lien : <a href="http://findmyfacebookid.com/" target="_blank">http://findmyfacebookid.com/</a>.',
                    GRAVATAR: 'Adresse email liée à votre compte gravatar : <a href="https://fr.gravatar.com/" target="_blank">https://fr.gravatar.com/</a>.'
                }
            }
        }
    });
