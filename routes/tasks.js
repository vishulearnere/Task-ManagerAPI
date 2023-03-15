const express = require('express')
const router = express.Router()

const {
    getAllTasks,
    getSingleTask,
    createTask,
    editTask,
    deleteTask
} = require('../controllers/tasks')

// router.get('/',(req, res)=>{
//     res.status(200).send('all the items')
// })

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getSingleTask).patch(editTask).delete(deleteTask)

module.exports = router


//---------------------------------------------------------------------------
