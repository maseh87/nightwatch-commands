// The following code requires casper 1.1 after the following commit
// https://github.com/n1k0/casperjs/commit/2378537a716a492533a279b8e3bc560ae3deca5a

var fs = require('fs');
var utils = require('utils');
var Yadda = require('yadda');

var parser = new Yadda.parsers.FeatureParser();
var library = require('./library').init();
var yadda = new Yadda.Yadda(library);

module.exports = (function(){

    var features = new Yadda.FeatureFileSearch('features').list();
    var steps = {}

    features.forEach(function(file){
        var text = fs.readFileSync(file, 'utf8');
        var feature = parser.parse(text);
        utils.puts(feature.title);

        feature.scenarios.forEach(function(scenario) {
            steps[scenario.title] = function(browser) {
                yadda.yadda(scenario.steps, { browser: browser });
            }
        });

    });

    // Close the session when done
    steps['Close Session'] = function(browser){
        browser.end()
    }

    return steps;

})();
