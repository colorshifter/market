'use strict';

describe('Service: process', function () {

  // load the service's module
  beforeEach(module('ortolangMarketApp'));

  // instantiate service
  var process;
  beforeEach(inject(function (_process_) {
    process = _process_;
  }));

  it('should do something', function () {
    expect(!!process).toBe(true);
  });

});