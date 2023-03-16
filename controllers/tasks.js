//this file has two types of  Error one when _id is validated and we don't get any data from provided id this one needs createCustomError
// the second one is try and catch wala error which includes validation and others   

const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {
    createCustomError
} = require('../errors/custome-error')

const getAllTasks = asyncWrapper(async (req,
    res) => {
    const alltasks = await Task.find({})
    res.status(200).json({
        tasks: alltasks
    })

})

const getSingleTask = asyncWrapper(async (req,
    res, next) => {
    const {
        id: taskID
    } = req.params
    const task = await Task.findOne({
        _id: taskID
    })
    if (!task) { // if task has nothing then 
        return next(createCustomError(`No task is found with ID ${taskID}`, 404)) // here we are returning instance of customAPIError in next
        // which has properties of error (super class) and createCustomAPI both 
    }
    return res.status(200).json({
        task
    })
})
const createTask = asyncWrapper(async (req,
    res, next) => {

    const task = await Task.create(req.body)
    console.log(task, req.body)
    res.status(201).json({
        task
    })
})
const editTask = asyncWrapper(async (req,
    res, next) => {

    taskID = req.params.id
    console.log(taskID, req.body)
    const updatedtask = await Task.findOneAndUpdate({
        _id: taskID
    }, req.body, {
        new: true,
        runValidators: true
    })
    if (!updatedtask) {
        return next(createCustomError(`No task is found with ID ${taskID}`, 404))

    }
    console.log(updatedtask)
    return res.status(200).json({
        sucess: true,
        task: updatedtask
    })
})
const deleteTask = asyncWrapper(async (req,
    res, next) => {
    taskID = req.params.id
    // body = req.body
    console.log(taskID)
    const deletedtask = await Task.findOneAndDelete({
        _id: taskID
    })
    console.log(taskID, deletedtask)
    if (!deletedtask) {
        return next(createCustomError(`No task is found with ID ${taskID}`, 404))

    }
    return res.status(200).json({
        sucess: true,
        task: deletedtask
    })

})
module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    editTask,
    deleteTask
}