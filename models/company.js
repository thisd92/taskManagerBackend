const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    cnpj: { type: String, required: true },
    addres: { type: String, required: true },
    city: { type: String },
    uf: { type: String },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    squads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Squad', unique: true }]

})

const Company = mongoose.model('Company', companySchema)

module.exports = Company