const express = require('express');
const router = express.Router();
const {
    getTasks,
    createTasks,
    updateTasks,
    deleteTasks,
    login
} = require('../controllers/taskController');
const {
    validateTask
} = require('../middleware/taskMiddleware');
const {
    authMiddleware
} = require('../middleware/authMiddleware');


router.get('/tasks', getTasks);

router.post('/login', login);

router.post('/tasks', authMiddleware, validateTask, createTasks);

router.put('/tasks/:id', validateTask, updateTasks);

router.delete('/tasks/:id', deleteTasks);

module.exports = router;