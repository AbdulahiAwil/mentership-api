export const errorHandle = (err,req,res,next)=>{
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: err.message || "Something went wrong",
        status
    })
}