var MockServer = require('mockserver');

module.exports = {
  setUp: function (callback) {
    this.client = require('../nightwatch.js').init();

    callback();
  },

  testSuccess: function(test) {
    this.client.waitForPageToBeMobified(100, function callback(result) {
      test.equal(true, result);
      test.done();
    });
  },

  tearDown: function(callback) {
    this.client = null;
    // clean up
    callback();
  }
}
