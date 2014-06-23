var request = require('request');
var client = require('../lib/client');
var matches = require('./matches');
var groups = require('./groups');

module.exports = function (app) {

    // Application view
    app.get('/', function (req, res) {
        client.matchesToday(function (err, matches) {
            res.render('index', { matches: matches});
        });
    });

    // Matches
    app.route('/matches').get(matches.all);
    app.route('/matches/:country_code').get(matches.forCountry);

    // Groups
    app.route('/groups').get(groups.all);
};
