// const express = require('express')
// const app = express()
// const tasks = require('./routes/tasks')
// const mongoDB = require('./db/connect')


// require('dotenv').config()
// // console.log(process.env)
// console.log(process.env.MONGO_URI,'ye jindgi hum nhi chodege')

// //middleware
// app.use(express.json())

// // app.use(mongoDB(process.env.URI))
// app.use('/api/v1/tasks', tasks)



// //routes
// app.get('/hello', (req, res) => {

//     res.status(200).json({
//         sucess: true,
//         data: 'getrequest'
//     })

// })

// // app.get('/api/v1/tasks') - get all the tasks
// // app.post('/api/v1/tasks')  - Create a new task
// // app.get('/api/v1/taska/:id') - get single task
// // app.patch('/api/v1/tasks/:id') - update task
// // app.delete('api/v1/tasks/:id') - delete task

// // TASK MANAGER API
// // R 1. GET -get all the tasks - req.url
// // R 2. GET - get a specific or single task - /:id  req.params
// // C 3. POST -  create a task  -  req.body
// // U 4. PUT/PATCH - update or EDIT a task - /:id req.params + req.body
// // D 5. DELETE - delete a task - /:id  req.params



// //   SCHEMA 
// //   ID- INbuilt by Mongoose
// //   Task - String
// //   Completed -  [Tue or False]

// const PORT = 3000

// const start = async() =>{
//     try {
//         await mongoDB(process.env.MONGO_URI)
//         app.listen(PORT, () => {
//             console.log(`server is listening at ${PORT} Port  No. ...`)
//         })
//     } catch (error) {
//         console.log(error)
        
//     }
// }
// start()
// // console.log('Task Manager App')



const express = require('express')
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const app = express()
require('dotenv').config()


app.use(express.static('./public'))

const connectdb =  require('./db/connect')

app.use(express.json())
app.use('/api/v1/tasks',tasks)

app.use(notFound)

const PORT = process.env.PORT || 3000
const start = async()=>{
    try {
        await connectdb(process.env.MONGO_URI)
    app.listen(PORT,()=>{
        console.log(`servers is listening at PORT NO.  ${PORT} ...`)})
        
    } catch (error) {
        conosle.log(error)
        
    }
}
start()