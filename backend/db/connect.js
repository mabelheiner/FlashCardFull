const { init } = require('passport');

const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized');
        return callback(null, _db);
    }

    MongoClient.connect(process.env.MONGODB_DATABASE_URI)
    .then((client) => {
        _db = client;
        callback(null, _db);
    })
    .catch((err) => {
        callback(err)
    })
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized')
    }
    return _db;
}

module.exports = {
    initDb,
    getDb,
};