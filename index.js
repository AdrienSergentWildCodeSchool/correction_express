const express = require('express');
const games = require('./games')

const serverPort = 8000;
const app = express()

// GET all games 
app.get('/games', (req, res) => {
    let { limit, released_year } = req.query
    console.log(req.query)
    if(limit) {
        limit = parseInt(limit)
        if(Number.isNaN(limit)) {
            res.status(400).send("Provide valide value for limit")
        }
        else {
            const limitedGames = games.slice(0, limit)
            res.send(limitedGames)
        }        
    }
    else if (released_year) {
       res.send(games.filter(game => game.released.includes(released_year)))      
    }
    else {
        res.send(games.slice(0, 10))
    }

})

// GET one games by id 
app.get("/games/:id", (req, res) => {
    
    const id = parseInt(req.params.id)

    if(Number.isNaN(id)) {
        res.status(400).send('Provide valid value for id')
    }
    else {
        const game = games.find(game => game.id === id)
        if(game) {
            res.send(game);
        }
        else {
            res.sendStatus(404);
        }
    }

})

app.listen(serverPort, (err) => {
    if(err) {
        console.error(err)
    }
    else {
        console.log('Server Express')
    }
})