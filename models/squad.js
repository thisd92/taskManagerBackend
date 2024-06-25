const mongoose = require('mongoose');

const squadSchema = new mongoose.Schema({
    name: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const Squad = mongoose.model('Squad', squadSchema);

module.exports = Squad;