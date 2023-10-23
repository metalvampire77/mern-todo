
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const TodoModel = require('./models/todo')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://metalvampire77:XgYrjeaZW16Y5Tmu@cluster0.te0xwmq.mongodb.net/?retryWrites=true&w=majority',{
    useUnifiedTopology: true
})
.then(() => {
    console.log(`connected`)
})
.catch(err => console.log(err))

const db = mongoose.connection

db.once('open',() => console.log('db connected'))

// // Serve the React application
// app.use(express.static(path.join(__dirname, '../client/dist')));


// // For any other route, serve the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
// });

require('dotenv').config();

app.get('/get',(req,res) => {
    TodoModel.find()
    .then((result) => {
        res.json(result)
    })
    .catch(err => res.json(err))
})

app.put('/update/:id',(req,res) => {
    const {id} = req.params
    const {done} = req.body
    TodoModel.findByIdAndUpdate({_id: id},{done: !done}, { new: true })
    .then((result) => {
        res.json(result)
    })
    .catch(err => res.json(err))
})

app.delete('/delete/:id',(req,res) => {
    const {id} = req.params
    TodoModel.findByIdAndDelete({_id: id})
    .then((result) => {
        res.json(result)
    })
    .catch(err => res.json(err))
})

app.post('/',(req,res) => {
    TodoModel.create(req.body)
    .then(() => res.json(req.body))
})




const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`server running on port ${PORT} `)
})