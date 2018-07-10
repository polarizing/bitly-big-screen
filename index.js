const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.send('HEY!');
// })

app.ws('/', function(ws, req) {
	ws.on('message', function(msg) {
		console.log(msg);
        ws.send('update');
	})
	console.log('socket', req.testing);
})

app.post('/gif', function(req, res) {
    // console.log(req);
    // console.log(req.body);
    var gif_link = req.body.text;
    console.log("Request to play a GIF: " + gif_link);
    expressWs.getWss().clients.forEach(client => client.send(gif_link));  

    res.json({
        "response_type": "in_channel",
        "text": "Playing GIF link for 10 seconds ...",
        "attachments": [
            {
                "text": gif_link
            }
        ]
    })
})

app.post('/change', function(req, res) {
    // var name = req.body.name,
        // color = req.body.color;
    console.log("Request to change state of big screen");
    // res.sendStatus(200);
    // ws.send('update');
    expressWs.getWss().clients.forEach(client => client.send("update"));  

    res.json({
    	"response_type": "in_channel",
    	"text": "Changing big screen.",
    	"attachments": [
	        {
	            "text":"Changing!"
	        }
    	]
    })

});

app.listen(3000, () => console.log('Server running on port 3000'));