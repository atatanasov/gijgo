var express = require('express'),
    fs = require('fs'),
    server = express();

server.use(express.static(__dirname));

server.get('/DataSources/GetPlayers', function (req, res) {
    data = fs.readFileSync('src/grid/js/Players.txt', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});

server.listen(3000);