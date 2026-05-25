// middlewares/errorHandler.js

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Development vs Production error logging can be separated here
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

export default globalErrorHandler;