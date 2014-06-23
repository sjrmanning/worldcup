var request = require('request');
var client = require('../lib/client');

module.exports.all = function (req, res, next) {
    client.groupResults(function (err, groups) {
        res.render('groups', { groups: groups});
    });
};
