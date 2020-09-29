const app = require('express')();
const http = require("http");
const https = require('https');
const path = require('path');
const subdomain = require('express-subdomain');
const fs = require('fs');

let options = {//je t'aime)
	key: fs.readFileSync('/etc/letsencrypt/live/henrotte.fr/privkey.pem', 'utf8'),
	cert: fs.readFileSync('/etc/letsencrypt/live/henrotte.fr/fullchain.pem', 'utf8'),
}

const router = require('express').Router();

module.exports = router;

/******************************************************************************/

app.use(require('express').static(__dirname + '/factory'));



app.use(subdomain('hugo', router));

router.use(require('express').static(__dirname + '/apcc'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/factory/henrotte.html');
});



router.get("/",(req,res) => {
	res.sendFile(__dirname + '/apcc/index.html');
});


https.createServer(options, app).listen(443);

http.createServer(function (req, res) {
	res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	res.end();
}).listen(80);
