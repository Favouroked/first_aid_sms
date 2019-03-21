const elasticsearch = require('elasticsearch');
const { ELASTIC_URL, ELASTIC_INDEX, ELASTIC_TYPE } = process.env;

const esClient = new elasticsearch.Client({
    host: `${ELASTIC_URL}`,
    log: 'error'
});

const searchElastic = (text) => {
    const body = {
        query: {
            multi_match: {
                query: text,
                fields: ['title'],
                fuzziness: 2
            }
        }
    };
    return esClient.search({ index: ELASTIC_INDEX, body });
};

const createDoc = (doc) => {
    const body = {
        index: ELASTIC_INDEX,
        type: ELASTIC_TYPE,
        id: doc.title,
        body: doc
    };
    return esClient.create(body);
}

module.exports = {
    searchElastic,
    createDoc
}