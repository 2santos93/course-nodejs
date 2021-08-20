const { saveFile, deleteFile, getFile } = require('../Helper/file');

const uploadFile = async (req, res) => {

    const { file } = req.files;

    try{
        const fileData = await saveFile(file, 'images');
        res.json(fileData);
    }catch(err){
        res.status(500).json({err});
    }

};

const updateImage = async (req, res) => {
    
    const {collection, id} = req.params;
    const {file} = req.files;
    
    const pathData = await saveFile(file, collection);
    
    const model = require(`../Models/${collection}`);

    const document = await model.findById(id);

    if(document.img) deleteFile(document.img);

    document.img = pathData.path;

    await document.save();

    return res.json(document);


}

const getImage = async (req, res) => {
    
    const {collection, id} = req.params;

    const model = require(`../Models/${collection}`);

    const document = await model.findById(id);

    const pathToImage = getFile(document.img);

    return res.sendFile(pathToImage);

}

module.exports = {
    uploadFile,
    updateImage,
    getImage
};