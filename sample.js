var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var momentTimeZone = require('moment-timezone');
var path = require('path');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
	res.render('index')
});

app.post('/submit/city', function(req, res){
	var city = req.body.city;
	city = toTitleCase(city);
	city = city.replace(/ /g,"_");
	var date = new Date();
	var places = ['Africa', 'America', 'Asia', 'Antarctica', 'Asia', 
		'Atlantic', 'Australia', 'Europe', 'Indian', 'Pacific'];
	var timeZones = moment.tz.names();
	try {

		places.forEach(function(entry){
			var temp = entry + '/' + city;	
			if (timeZones.indexOf(temp) >= 0) {
				date = moment().tz(temp).format('LLLL');
				city = city.replace(/_/g," ");
				var expression = 'The current time and date in' + city + ' is: ' + date + '.';
				var contents = '<tr><td>'+'The current time and date in ' + city + ' is: ' + date + '.'+ '</td></tr><br><br><button onclick= "goBack()">Go Back</button><script>function goBack() {window.history.back();}</script>'
				var html = '<html>\n<body>\n<table></table>\n</body>\n</html>'
				res.send(html + contents)
				throw BreakException;
			}
				
		});
		console.log('The time for the following city is not available.  Please reenter.');
		res.render('index');
	}
	catch (e) {
		console.log('Found');
	}
});

function toTitleCase(str)
{
   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

app.listen(3000, function() {
	console.log('Server Started on Port 3000')
});

