const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
});

module.exports = Author = mongoose.model('Author', AuthorSchema);