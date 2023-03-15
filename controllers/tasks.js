const Task = require('../models/task')

const getAllTasks = async (req,
    res) => {
    try {
        const alltasks = await Task.find({})
        res.status(200).json({ tasks:alltasks
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            sucesss: false,
            msg: error.message
        })
    }
}

const getSingleTask = async(req,
    res) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOne({
            _id: taskID
        })
        if(task){
           return  res.status(200).json({
               task
            })
        }
        return res.status(404).json({sucesss:false,msg:`No task is found with ${taskid}`})
    } catch (error) {
        console.log(error.msg)
        return res.status(500).json({
            sucesss: false,
            msg: error.message
        })

    }
}
const createTask = async(req,
    res) => {

        try{
        const task = await Task.create(req.body)
        console.log(task,req.body)
        res.status(201).json({
            task
        })}
        catch(error){
            console.log(error)
            return res.status(500).json({
                error,
                sucesss: false,
                msg: error.message
            })
        }
}
const editTask = async(req,
    res) => {
        try{
            taskID = req.params.id
            // bodi =  req.body
            // console.log(ID, body)
            const updatedtask = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new:true,
            runValidators:true})
            if (updatedtask) {

                return res.status(200).json({
                    sucess: true,
                    task: updatedtask
                })
            }
            console.log(updatedtask)
            return res.status(404).json({msg:`no task is found with ${ID} ID`})
        }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            sucesss: false,
            msg: error.message
        })
    }

}
const deleteTask = async(req,
    res) =>{
    try {
        ID = req.params.id
        // body = req.body
        // console.log(ID)
        const deletedtask = await Task.findOneAndDelete({_id:ID})
        console.log(ID, deletedtask)
        if (deletedtask) {

                return res.status(200).json({
                    sucess: true,
                    task: deletedtask
                })
            }
        return res.status(404).json({msg:`no task is found with ${ID} ID `})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            sucesss: false,
            msg: error.message
        })
    }
}
module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    editTask,
    deleteTask
}