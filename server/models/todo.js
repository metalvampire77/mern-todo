const { default: mongoose } = require("mongoose");

const TodoSchema = new mongoose.Schema({
    todo: String,
    done:{
        type: Boolean,
        default: false
    }
})

const TodoModel = new mongoose.model('todos',TodoSchema)

module.exports = TodoModel