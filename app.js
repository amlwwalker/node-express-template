var express = require('express'),
bodyParser = require('body-parser'),
ejs = require('ejs')
serve = express();

//create a variable to parse json from the body
//ENTER HERE https://www.npmjs.com/package/body-parser
var jsonParser = bodyParser.json({ type: 'application/json' })

// Be able to read form values from the body - (application/x-www-form-urlencoded) parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//serve JSON
serve.get('/', function(req, res) {
	res.sendStatus(200);
});

console.log("hello world");
var adminChecker = function(req, res, next) {
	if (req.query.admin == undefined) {
		res.end(JSON.stringify({error: "you are not an admin"}))
	} else {
		next()
	}
}

serve.get('/admin', adminChecker, function(req, res, next) {
	res.end(JSON.stringify({status: "yup, you are an admin"}));
})
//demonstrate using ejs templating engine
serve.get('/homepage', function(req, res) {
	res.render('homepage', {welcome: "welcome to my homepage"});
})

//read a GET parameter
serve.get('/params/name/:name', function(req, res) {
	res.end(JSON.stringify({name: req.params.name}))
});

//read a GET query value
serve.get('/query', function(req, res) {
	res.end(JSON.stringify({name: req.query.name}))
});

//demonstration of url form parsing
serve.post('/form', urlencodedParser, function(req, res) {
	res.end(JSON.stringify({username: req.body.username}));
});

//remember to set the Content-Type to application/json on posting 
serve.post('/json', jsonParser, function(req, res) {
	res.end(JSON.stringify(req.body))
})


//serve anything from the public folder as status file
serve.use(express.static('public'));

//set the engine for templating to ejs
serve.set('view engine', 'ejs');  

module.exports = serve;