const express = require('express');
const router = express.Router();
const {
    getTasks,
    getTasksById,
    createTasks,
    updateTasks,
    toggleTask,
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

router.get('/tasks/:id', authMiddleware, getTasksById);

router.post('/register', register);

router.post('/login', login);

router.post('/tasks', authMiddleware, validateTask, createTasks);

router.patch('/tasks/:id/complete', authMiddleware, toggleTask)

router.put('/tasks/:id', validateTask, updateTasks);

router.delete('/tasks/:id', deleteTasks);

module.exports = router;