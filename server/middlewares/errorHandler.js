function errorHandler(err, req, res, next) {
    console.log(err, "console log error handler")

    let statusCode = null
    let errorMessage = null
    let errorCode = null

    switch(err.name){
        case 'BadRequest':
            statusCode = 400
            errorCode = err.name
            errorMessage = 'Bad Request'
            break

        case 'NotFound':
            statusCode = 404
            errorCode = err.name
            errorMessage = 'Url not found'
            break 

        case 'JsonWebTokenError':
            statusCode = 401
            errorCode = err.name
            errorMessage = 'Please login first'
            break 

        case 'SequelizeValidationError':
            statusCode = 400
            errorCode = 'VALIDATION_ERROR'
            const validationErrors = []
            err.errors.forEach(element => {
                validationErrors.push(element.message)
            });
            errorMessage = validationErrors
            break 

        default:
            statusCode = 500
            errorMessage = 'internal server error'
            errorCode = 'INTERNAL_SERVER_ERROR'
    }

    res.status(statusCode).json({
        errorCode,
        message: errorMessage
    })

}

module.exports = errorHandler