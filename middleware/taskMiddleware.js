function validateTask(req, res, next){
    const title = req.body.title;
    if(!title){
        return res.status(400).json({
            message: "Title wajib diisi!"
        });
    }
    next();
}

module.exports = {
    validateTask
}