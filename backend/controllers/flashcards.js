const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('FlashCards').collection('Cards').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res, net) => {
    const cardId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('FlashCards')
        .collection('Cards')
        .find({_id: cardId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    })
}

const createCard = async (req, res) => {
    const card = {
        term: req.body.term,
        definition: req.body.definition
    };
    const response = await mongodb
        .getDb()
        .db('FlashCards')
        .collection('Cards')
        .insertOne(card);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the card.')
    }
}

const updateCard = async (req, res) => {
    const cardId = new ObjectId(req.params.id);
    const card = {
        term: req.body.term,
        definition: req.body.definition
    };
    const response = await mongodb
        .getDb()
        .db('FlashCards')
        .collection('Cards')
        .replaceOne({_id: cardId}, card);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the card.')
    }
};

const deleteCard = async (req, res) => {
    const cardId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDb()
        .db('FlashCards')
        .collection('Cards')
        .deleteOne({_id: cardId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the card.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createCard,
    updateCard,
    deleteCard
}