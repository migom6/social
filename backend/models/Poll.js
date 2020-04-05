const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: [500, 'title cant not be more than 100 words'],
            required: true
        },

        choices: [
            {
                choice: String,
                count: Number
            }
        ]
    }
);

module.exports = mongoose.model('Poll',PollSchema);