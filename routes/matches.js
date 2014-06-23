var request = require('request');
var client = require('../lib/client');

module.exports.all = function (req, res, next) {
    client.allMatches(function (err, matches) {
        res.render('matches', { title: 'All Matches', matches: matches});
    });
};

module.exports.forCountry = function (req, res, next) {
    var country_code = req.params.country_code;
    client.matchesForCountry(country_code, function (err, matches) {
        res.render('matches', { title: 'Matches for ' + country_code, matches: matches});
    });
};
