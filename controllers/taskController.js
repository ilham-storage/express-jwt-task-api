const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function register(req, res){
    const { username, password} = req.body;

    const existingUser = await prisma.user.findUnique({
    where: {
        username: username
    }
});

if(existingUser){
    return res.status(400).json({
        message: "Username sudah digunakan"
    });
}
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data : {
            username,
            password: hashedPassword
        }
    });
    
    res.status(201).json(user);
};

async function login(req, res){
    const { username, password} = req.body;

    const user = await prisma.user.findUnique({
    where: {
        username: username
    }
});

    if(!user){
        return res.status(401).json({
            message: "Username atau Password salah!"
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );
    
    if(!isMatch){
        return res.status(401).json({
            message: "Username atau Password salah!"
        });
    }

    const payload = {
        id : user.id,
        username : user.username
    };
    
    const token = jwt.sign(payload, 'secretkey');

    res.json({
        token: token
    });

};

async function getTasks(req, res){
    const tasks = await prisma.task.findMany({
        where: {
            userId: req.user.id
        }
    });
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
};

async function createTasks(req, res){
    const title = req.body.title;
    const userId = req.user.id;

    const task = await prisma.task.create({
        data: {
            title : title,

            userId: req.user.id
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
    register,
    login
}