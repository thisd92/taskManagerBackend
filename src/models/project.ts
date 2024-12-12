import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    toDo: { type: Boolean, default: true },
    isFinished: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    createdBy: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
})

export const Project = mongoose.model('Project', projectSchema);
