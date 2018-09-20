var Joi = require('joi');
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/api/v1/games', function (req, res) {
    res.send(games);
});

app.get('/api/v1/games/:id', function (req, res) {
    const game = games.find(g => g.id === parseInt(req.params.id));
    if (!game) {
        res.status(404).send('No game found');
    }

    res.send(game);
});

app.post('/api/v1/games', (req, res) => {

    const { error } = validateGame(req.body);

    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    const game = {
        id: games.length + 1,
        name: req.body.name
    };

    games.push(game);
    res.send(game);
});

app.put('/api/v1/games/:id', function (req, res) {
    const game = games.find(g => g.id === parseInt(req.params.id));
    if (!game) {
        res.status(404).send('No game found');
    }

    const { error } = validateGame(req.body);

    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    game.name = req.body.name;

    res.send(game);
});

function validateGame(game) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(game, schema);
}