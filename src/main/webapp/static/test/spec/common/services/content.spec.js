'use strict';

describe('Service: Content', function () {

    // load the service's module
    beforeEach(module('ortolangMarketApp'));

    // instantiate service
    var Content, httpBackend, url,
        forceDownloadQueryParam = '?fd=true',
        previewQueryParam = '?preview=';

    beforeEach(inject(function (_Content_, _$httpBackend_, _url_) {
        Content = _Content_;
        httpBackend = _$httpBackend_;
        url = _url_;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return the content url', function () {
        expect(!!Content).toBe(true);
        expect(Content.getContentUrlWithKey('k1')).toBe(url.content + '/key/k1');
        expect(Content.getContentUrlWithPath('<path>', '<alias>', '<root>')).toBe(url.content + '/<alias>/<root>/<path>');
    });

    it('should return the preview url', function () {
        var expectedUrl = url.content + '/key/k1' + previewQueryParam;
        expect(Content.getPreviewUrlWithKey('k1')).toBe(expectedUrl + 'small');
        expect(Content.getPreviewUrlWithKey('k1', false)).toBe(expectedUrl + 'small');
        expect(Content.getPreviewUrlWithKey('k1', true)).toBe(expectedUrl + 'large');
    });

    it('should return the download url', function () {
        var expectedUrl = Content.getContentUrlWithKey('k1') + forceDownloadQueryParam;
        expect(Content.getDownloadUrlWithKey('k1')).toBe(expectedUrl);
        expectedUrl = Content.getContentUrlWithPath('<path>', '<alias>', '<root>') + forceDownloadQueryParam;
        expect(Content.getDownloadUrlWithPath('<path>', '<alias>', '<root>')).toBe(expectedUrl);
    });

    it('should download data', function () {
        httpBackend.whenGET(url.content + '/key/k1').respond('sample code');

        var promise = Content.downloadWithKey('k1'), theData;
        promise.then(function (data) {
            theData = data;
        });
        httpBackend.flush();
        expect(theData.data).toBe('sample code');
    });
});
