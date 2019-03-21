require('dotenv').config()
const express = require('express');
const logger = require('morgan');

const { sendMessage } = require('./helpers/sms_helper');
const { searchElastic, createDoc } = require('./helpers/elasticsearch_helper');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({ status: 200, message: "Welcome to Hoovah First Aid SMS API"});
});

app.post('/sms', async (req, res) => {
    const { to, text } = req.body;
    const fromNumber = req.body.from;
    if (to === '54545') {
        console.log(`[x] searching ${text}`);
        const elastic_result = await searchElastic(text);
        const result = elastic_result.hits.hits;
        console.log(`[x] search completed for ${text} with length ${result.length}`);
        for (let item of result) {
            sendMessage(fromNumber, `${item._source.title}:\n${item._source.content}`)
                .then(resp => console.log(`[x] SMS sent for ${item._source.title}`))
                .catch(error => console.log(`[x] SMS failed for ${item._source.title}\n${error}`));
        }
        res.json({status: 200, message: "Search completed"});
    }
});

app.post('/insert-doc', async (req, res) => {
    const { title, content } = req.body;
    const doc = {title, content};
    const response = await createDoc(doc);
    res.json(response);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on PORT ${process.env.PORT || 3000}`);
});