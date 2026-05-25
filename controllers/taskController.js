const jwt = require('jsonwebtoken');

const tasks = [
        {
            id: 1,
            title: 'Belajar Backend'
        },
        {
            id: 2,
            title: 'Belajar Express'
        }
    ];

function login(req, res){
    const username = req.body.username;
    const payload = {
        id: 1,
        username: username,
        role: 'admin'
    }
    const token = jwt.sign(payload, 'secretkey');
    res.json({
        token: token
    });
}

function getTasks(req, res){
    const id = req.params.id;
    const task = task.find(task => task.id === Number(id));
    res.json(tasks);
}

function createTasks(req, res){
    const title = req.body.title;
    const taskBaru = {
        id: tasks.length + 1,
        title: title
    }
    tasks.push(taskBaru);
    res.status(201).json(taskBaru);
};

function updateTasks(req, res){
    const id = Number (req.params.id);
    const task = tasks.find(task => task.id === Number(id));
    const title = req.body.title;
    task.title = title;
    res.json(task);
};

function deleteTasks(req,res){
    const id = Number(req.params.id);
    const index = tasks.findIndex(task => task.id === Number(id));
    tasks.splice(index, 1);
    res.json(tasks);
};


module.exports = {
    getTasks,
    createTasks,
    updateTasks,
    deleteTasks,
    login
}