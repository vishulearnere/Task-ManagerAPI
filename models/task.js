const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [40, 'length of task can not be more than 40 characters']

    },
    completed: {
        type: Boolean,
        default: false

    }
})
//validation 

module.exports = mongoose.model('Task', TaskSchema)