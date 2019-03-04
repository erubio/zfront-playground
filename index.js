'use strict';

var express = require('express'),
	app = express(),
	consolidate = require('consolidate'),
	dust = require('dustjs-linkedin');

app.set('port', (process.env.PORT || 5000));

// Templates engine configuration
dust.config.whitespace = false;
app.engine('dust', consolidate.dust);
app.set('view engine', 'dust');
app.set('view cache', true); // Cache template html to javascript process
app.set('json spaces', 0); // Trim json responses


app.get('/', function (req, res) {
	var imgUrl = req.query.sharingImgUrl;
	if(/^\/\//.test(imgUrl)) {
		imgUrl = 'http:' + imgUrl;
	}
	res.render('home',{
		imgUrl: imgUrl
	});
});

app.get('/share', function (req, res) {
	res.render('share', {
		locale: req.query.fb_locale || 'es_ES'
	});
});

app.listen(app.get('port'), function () {
	console.log('Playground listening on port ' + app.get('port'));
});