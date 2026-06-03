const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function register(req, res){
try{
    const { username, password} = req.body;

    if(!username || !password){
        res.json(400).json({
            message: "Username dan Password Wajib diisi!"
        });
    }

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
    
    res.status(201).json({
        id: user.id,
        username: user.username
    });
    } catch(error){
        console.error(error);

        res.status(500).json({
            message: "Terjadi kesalahan server!"
        });
    }
};

async function login(req, res){
try{
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
    
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({
        token: token
    });

    } catch (error){
        console.error(error);

        res.status(500).json({
            message: "Terjadi kesalahan Server!"
        });
    }

};

async function getTasks(req, res){
    try{
        const completed = req.query.completed;
        const priority = req.query.priority;
        const search = req.query.search;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1)* limit;
        const sort = req.query.sort;

        const where= {
            userId: req.user.id
        };

        let filterCompleted;

        let orderBy = {
            createdAt: "desc"
        };

        if(completed === "true"){
            filterCompleted= true;
        } else if (completed === "false"){
            filterCompleted= false;
        };

        if(filterCompleted !== undefined){
            where.completed = filterCompleted;
        };

        if(priority){
            where.priority = priority;
        }

        if(search){
            where.title ={
                contains: search,
                mode: "insensitive"
            };
        }
        
        if(sort === "title"){
            orderBy = {
                title: "asc"
            };
        } else if(sort === "createdAt"){
            orderBy = {
                title: "desc"
            };
        }

        const tasks = await prisma.task.findMany({
        where,
        orderBy,
        skip,
        take: limit
    });
    res.json(tasks);
    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: "Terjadi kesalahan server!"
        });
    }
}

async function getTasksById(req, res){
try{
    const id = Number(req.params.id)

    const task = await prisma.task.findUnique({
        where: {
            id : id
        }
    });

    if(!task){
        return res.status(404).json({
            message: "Task tidak ditemukan"
        });
    }

    if(task.userId !== req.user.id){
        return res.status(403).json({
            message : "bukan halaman anda"
        });
    }

    res.json(task);
    } catch(error){
        console.error(error);
        
        res.status(500).json({
            message: "Terjadi kesalahan server!"
        });
    }
}

async function createTasks(req, res){
try{
    const title = req.body.title;
    const priority = req.body.priority;

    if(!title){
        return res.status(400).json({
            message: "Title harus diisi!"
        });
    }

    if(
        priority &&
        (
            priority !== "low" &&
            priority !== "Medium" &&
            priority !== "High"
        )
    ){
        return res.status(400).json({
            message: "Priority harus low, medium, atau high"
        });
    }

    const task = await prisma.task.create({
        data: {
            title : title,

            userId: req.user.id,

            priority: priority
        }
    });
    res.status(201).json(task);

    } catch(error){
        console.error(error);

        res.status(500).json({
            message: "Terjadi kesalah server!"
        });
    }
}

async function updateTasks(req, res){
try{
    const id = Number(req.params.id);
    const title = req.body.title;

    if(!title){
        return res.status(400).json({
            message: "Title harus diisi!"
        });
    }

    const task = await prisma.task.findUnique({
        where: {
            id: id
        }
    });

     if(!task){
        return res.status(404).json({
            message: "Task tidak ditemukan"
        });
    }

    if(task.userId !== req.user.id){
        return res.status(403).json({
            message : "bukan halaman anda"
        });
    }

    const updatedTask = await prisma.task.update({
        where: {
            id
        },
        data: {
            title
        }
    });
    res.json(updatedTask);

    } catch(error){
        console.error(error);

        res.status(500).json({
            message: "Terjadi kesalahan server!"
        });
    } 
}

async function toggleTask(req, res){
try{
    
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({
        where: {
            id: id
        }
    });

    if(!task){
        return res.status(404).json({
            message: "Task tidak ditemukan!"
        });
    }

    if(task.userId !== req.user.id){
        return res.status(403).json({
            message : "bukan halaman anda"
        });
    }
    const toggleTask = await prisma.task.update({
        where: {
            id
        },
        data: {
            completed: !task.completed
        }
    });
    res.json(toggleTask);

} catch(error){
    console.error(error);

    res.status(500).json({
        message: "Terjadi Kesalahan Server!"
    });
}
}

async function deleteTasks(req,res){
try{
    const id = Number(req.params.id);
    const task = await prisma.task.findUnique({
        where: {
            id : id
        }
    });

    if(!task){
        return res.status(404).json({
            message: "Task tidak ditemukan"
        });
    }

    if(task.userId !== req.user.id){
        return res.status(403).json({
            message : "bukan halaman anda"
        });
    }
     const deletedTask = await prisma.task.delete({
        where: {
            id
        }
    });
    res.json(deletedTask);

    } catch(error){
        console.error(error);

        res.status(500).json({
            message: "Terjadi kesalahan Server!"
        });
    }
};


module.exports = {
    getTasks,
    getTasksById,
    createTasks,
    updateTasks,
    toggleTask,
    deleteTasks,
    register,
    login
}