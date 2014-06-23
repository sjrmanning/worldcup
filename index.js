var express = require('express');

var config = require('./config');
var app = express();

// Server configuration
app.set('views', 'templates');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

// Routes
var routes = require('./routes')(app);

var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});
