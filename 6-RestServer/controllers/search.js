const {
    collectionsEnabled, 
} = require('../Models');

const searchElements = async (req, res) => {

    const { collection, query } = req.params;

    const model = require(`../Models/${collection}`);

    const queryRegex = new RegExp(query, 'i');

    const documents = await model.find({
        $or: [
            {name: queryRegex},
            {email: queryRegex},
            {role: queryRegex},
        ],
        $and: [
            {active: true}
        ]
    })
    .populate(['category', 'user']); 

    return res.json(documents);
};

module.exports = {
    searchElements
};