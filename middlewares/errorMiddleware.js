const notFound = (req,res,next)=>{
    const error = new error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// remove NODE_ENV it is in production
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === 'prodcution' ? null : err.stack,
    });
};
module.exports = { notFound,errorHandler }
