const path = require('path'); 
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;

const pathDefaultImage = path.join(__dirname, '../uploads', 'images', 'defaultImage.jpg');

const getExtension = (fileName) => {
    const arrName = fileName.split('.');
    return arrName[arrName.length-1];

};

const saveFile = (file, folder = '', allowedExtensions = ['jgp','png','jpeg','gif'], cloud = true) => {

    return new Promise( (resolve, reject) => {

        const extension = getExtension(file.name);

        if(allowedExtensions.includes(extension)) return reject('the extension isnt allowed');

        
        if(!cloud){
            const fileName = uuidv4()+'.'+extension;
            const uploadPath = path.join(__dirname, '../uploads/', folder, fileName);
    
            file.mv(uploadPath, function(err) { 
              if (err) return reject(err);
          
              return resolve({
                  path: uploadPath,
              });
            });
        }

        return cloudinary.uploader.upload(file.tempFilePath)
            .then((response) => resolve({path: response.secure_url}))
            .catch((err) => res.status(500).json(err));
    });

}

const deleteFile = (filePath, cloud = true) => {

    if(!cloud){
        if(!fs.existsSync(filePath)) return;
    
        return fs.unlinkSync(filePath)
    }

    const name = getName(filePath);
    return cloudinary.uploader.destroy(name);

}

const getFile = (filePath) => {

    if(filePath && fs.existsSync(filePath)){
        return filePath;
    }

    return pathDefaultImage;
}

const getName = (fileName) => {
    const arrName = fileName.split('/');
    const nameWithExtension = arrName[arrName.length-1];
    const name = nameWithExtension.split('.')[0];

    return name;
}

module.exports = {
    getExtension,
    saveFile,
    deleteFile,
    getFile
};