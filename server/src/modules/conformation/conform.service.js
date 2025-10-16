const Image = require('./confrom.model'); // Adjust the path based on your directory structure
const fs = require('fs');

const saveImage = async (file) => {
    const image = new Image({
        filename: file.filename,
        path: file.path,
        size: file.size,
    });
    
    return await image.save();
};

module.exports = {
    saveImage,
};
