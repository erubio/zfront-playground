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
	var acceptedLanguage = req.headers['accept-language'];
	console.log('HEADERS', req.headers);
	console.log('type', typeof req.headers);
	console.log('acceptedLanguagEE', acceptedLanguage)
	var description = 'Descripción rellenada sin tener en cuenta los headers';

	if(/^\/\//.test(imgUrl)) {
		imgUrl = 'http:' + imgUrl;
	}

	if (acceptedLanguage && acceptedLanguage.indexOf('es-ES') !== -1) {
		description = 'Descripción en español';
	} else if (acceptedLanguage && acceptedLanguage.indexOf('en-US') !== -1){
		description = 'English description';
	}
	res.render('home',{
		imgUrl,
		description
	});
});

app.get('/test2', function (req, res) {
	var acceptedLanguage = req.headers['accept-language'];
	var description = 'Descripción rellenada sin tener en cuenta los headers';

	if (acceptedLanguage.indexOf('es-ES') !== -1) {
		description = 'Descripción en español';
	} else if (acceptedLanguage.indexOf('en-US') !== -1){
		description = 'English description';
	}
	res.render('home',{
		description
	});
});


app.listen(app.get('port'), function () {
	console.log('Playground listening on port ' + app.get('port'));
});