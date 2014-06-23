var config = require('../config');
var request = require('request');

var API_URL = config.api_url;

matchesToday = module.exports.matchesToday = function (callback) {
    var url = API_URL + "/matches/today";

    request({ url: url, json: true }, function (err, resp, body) {
        if (err) {
            return callback(err);
        }

        // Convert times to local.
        body.forEach(function (match) {
            match.datetime = convertTime(match.datetime, 8);
            addHatchdlings(match);
        });

        callback(null, body);
    });
};

allMatches = module.exports.allMatches = function (callback) {
    var url = API_URL + "/matches";

    request({ url: url, json: true }, function (err, resp, body) {
        if (err) {
            return callback(err);
        }

        // Convert times to local.
        body.forEach(function (match) {
            match.datetime = convertTime(match.datetime, 8);
            addHatchdlings(match);
        });

        callback(null, body);
    });
};

matchesForCountry = module.exports.matchesForCountry = function (code, callback) {
    var url = API_URL + "/matches/country?fifa_code=" + code;

    request({ url: url, json: true }, function (err, resp, body) {
        if (err) {
            return callback(err);
        }

        // Convert times to local.
        body.forEach(function (match) {
            match.datetime = convertTime(match.datetime, 8);
            addHatchdlings(match);
        });

        callback(null, body);
    });
};

groupResults = module.exports.groupResults = function (callback) {
    var url = API_URL + "/group_results";

    request({ url: url, json: true }, function (err, resp, body) {
        if (err) {
            return callback(err);
        }

        // Group response by groups.
        var groups = {1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []};
        body.forEach(function (country) {
            addHatchdlingsToTeam(country);
            groups[country.group_id].push(country);
        });

        callback(null, groups);
    });
};

function convertTime(date, offset) {
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    date = new Date(date);
    utc = date.getTime() + (date.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (3600000 * offset));
}

function addHatchdlings(match) {
    match.away_team.hatchdling = config.team_table[match.away_team.code];
    match.home_team.hatchdling = config.team_table[match.home_team.code];
}

function addHatchdlingsToTeam(country) {
    country.hatchdling = config.team_table[country.fifa_code];
}
