'use strict';

var express = require('express'),
	app = express(),
	consolidate = require('consolidate'),
	dust = require('dustjs-linkedin');

// Templates engine configuration
dust.config.whitespace = false;
app.engine('dust', consolidate.dust);
app.set('view engine', 'dust');
app.set('view cache', true); // Cache template html to javascript process
app.set('json spaces', 0); // Trim json responses


app.get('/', function (req, res) {
	res.render('home');
});

app.listen(80, function () {
	console.log('Playground listening on port 3000!');
});