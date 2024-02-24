const mongoose = require('mongoose');

const uploadModel = mongoose.Schema({
    File: {
        type: String,
        require: [true, 'Please select image']
    }
})


module.exports = mongoose.model("FileUpload", uploadModel)