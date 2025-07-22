const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/quotes/random', (req, res, next) => {
    try {
        const randomQuote = getRandomElement(quotes);
        res.status(200).send({quote: randomQuote})
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

app.get('/api/quotes', (req, res, next) => {
    try {
        const { person } = req.query;
        if (person) {
            const filteredQuotes = quotes.filter(quote => quote.person === person);
            res.status(200).send({ quotes: filteredQuotes });
        } else {
            res.status(200).send({ quotes });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

app.post('/api/quotes', (req, res, next) => {
    try {
        const quote = req.query.quote;
        const person = req.query.person;
        if (!quote || !person) {
            return res.status(400).send({ error: 'Quote and person are required' });
        }
        const newQuote = { quote, person };
        quotes.push(newQuote);
        res.status(201).send({ quote: newQuote });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})