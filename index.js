const express = require('express');
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.send('HEY!');
// })

app.post('/test-page', function(req, res) {
    var name = req.body.name,
        color = req.body.color;
    console.log("Got a request!");
    // res.sendStatus(200);
    res.json({
    	"response_type": "in_channel",
    	"text": "It's 80 degrees right now.",
    	"attachments": [
	        {
	            "text":"Partly cloudy today and tomorrow"
	        }
    	]
    })

});

app.listen(3000, () => console.log('Server running on port 3000'));