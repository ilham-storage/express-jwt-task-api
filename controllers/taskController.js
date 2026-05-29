const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

async function getTasks(req, res){
    const tasks = await prisma.task.findMany();
    res.json(tasks);
}

async function getTasksById(req, res){
    const id = Number(req.params.id)
    const task = await prisma.task.findUnique({
        where: {
            id : id
        }
    });
    res.json(task);
}

async function createTasks(req, res){
    const title = req.body.title;

    const task = await prisma.task.create({
        data: {
            title : title
        }
    });
    res.status(201).json(task);
};

async function updateTasks(req, res){
    const id = Number(req.params.id);
    const title = req.body.title;

    const task = await prisma.task.update({
        where: {
            id: id
        },
        data: {
            title: title
        }
    });
    res.json(task);
};

async function deleteTasks(req,res){
    const id = Number(req.params.id);
    const task = await prisma.task.delete({
        where: {
            id : id
        }
    });
    res.json({
        message: "Data berhasil dihapus"
    });
};


module.exports = {
    getTasks,
    getTasksById,
    createTasks,
    updateTasks,
    deleteTasks,
    login
}