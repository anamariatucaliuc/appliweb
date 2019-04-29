//datalayer
var datalayer = require('./datalayer.js');


const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
var route = require('./api-route');


app.use(bodyParser.json());                             // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));       // to support URL-encoded bodies

app.use(express.static(__dirname + '/public'));
route(app);

datalayer.init(function () {
    console.log('init');
    app.listen(process.env.PORT || 3000, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
});
