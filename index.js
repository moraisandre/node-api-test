var express = require('express');
var app = express();

app.use(express.json());

const games = [{
        id: 1,
        name: "Castlevania"
    },
    {
        id: 2,
        name: "Metroid"
    }
];

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/api/v1/game', function (req, res) {
    res.send([1, 2, 3]);
});

app.get('/api/v1/game/:id', function (req, res) {
    const game = games.find(g => g.id === parseInt(req.params.id));
    if (!game) {
        res.status(404).send('No game found');
    }

    res.send(game);
});

app.post('api/games', (req, res) => {
    const game = {
        id: games.length + 1,
        name: req.body.name
    };

    games.push(game);
    res.send(game);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))