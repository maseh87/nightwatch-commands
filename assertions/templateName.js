
function Assertion() {}
Assertion.prototype.command = function(expected) {
  var self = this;

  return this.client.getEvaluatedData(function(result) {
    var passed = result.value.content.templateName === expected;
    msg = msg || ('Testing if the page title equals "' + expected + '".');
    self.client.assertion(passed, result.value, expected, msg, self.abortOnFailure);
  });
};

module.exports = Assertion;