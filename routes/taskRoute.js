const express = require('express');
const router = express.Router();
const {
    getTasks,
    getTasksById,
    createTasks,
    updateTasks,
    deleteTasks,
    register,
    login,
} = require('../controllers/taskController');
const {
    validateTask
} = require('../middleware/taskMiddleware');
const {
    authMiddleware
} = require('../middleware/authMiddleware');


router.get('/tasks', authMiddleware, getTasks);

router.get('/tasks/:id', getTasksById);

router.post('/register', register);

router.post('/login', login);

router.post('/tasks', authMiddleware, validateTask, createTasks);

router.put('/tasks/:id', validateTask, updateTasks);

router.delete('/tasks/:id', deleteTasks);

module.exports = router;