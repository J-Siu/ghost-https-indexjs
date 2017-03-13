// HTTPS

const fs = require('fs');
const url = require('url');
const http = require('http');
const https = require('https');

// Fill in your certificate files
const serverKey='';
const serverCrt='';
const serverCa='';

const httpsOptions = {
	key: fs.readFileSync(serverKey),
	cert: fs.readFileSync(serverCrt),
	ca: fs.readFileSync(serverCa),
	ciphers: [
		"ECDHE-RSA-AES256-SHA384",
		"DHE-RSA-AES256-SHA384",
		"ECDHE-RSA-AES256-SHA256",
		"DHE-RSA-AES256-SHA256",
		"ECDHE-RSA-AES128-SHA256",
		"DHE-RSA-AES128-SHA256",
		"HIGH",
		"!aNULL",
		"!eNULL",
		"!EXPORT",
		"!DES",
		"!RC4",
		"!MD5",
		"!PSK",
		"!SRP",
		"!CAMELLIA"
	].join(':'),
};

// HTTP Redirect to HTTPS

http.createServer(function (req, res) {
	res.writeHead(301, { "location": "https://johnsiu.com" + req.url });
	res.end();
}).listen(80, '0.0.0.0');

// # Ghost Startup
// Orchestrates the startup of Ghost when run from command line.

var ghost = require('./core'),
    express = require('express'),
    errors = require('./core/server/errors'),
    parentApp = express();

// Make sure dependencies are installed and file system permissions are correct.
require('./core/server/utils/startup-check').check();

ghost().then(function (ghostServer) {
	// Mount our Ghost instance on our desired subdirectory path if it exists.
	parentApp.use(ghostServer.config.paths.subdir, ghostServer.rootApp);

	// Let Ghost handle starting our server instance.
	//ghostServer.start(parentApp);

	https.createServer(httpsOptions, parentApp).listen(443, '0.0.0.0');
}).catch(function (err) {
	errors.logErrorAndExit(err, err.context, err.help);
});
