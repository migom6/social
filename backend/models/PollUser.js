const mongoose = require('mongoose');

const PollUserSchema = new mongoose.Schema({
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    poll : {
        type: mongoose.Schema.ObjectId,
        ref: 'Poll',
        required: true
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    choice: String
    
});

// PollUserSchema.static.voting = async function(poll, option) {
//     const identifier = `options.${option}.count`
//     try {
//         this.model('Poll').findByIdAndUpdate(poll, {
//             $inc : {[identifier]: 1}

//         });
//     } catch(err) {
//         console.log(err);
//     }
// }

module.exports = mongoose.model('PollUser',PollUserSchema);