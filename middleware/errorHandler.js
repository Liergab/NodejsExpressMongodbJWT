const {constants} = require("../constant")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title:"Vaidation Failed",message: err.message, stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not found",message: err.message, stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"forbidden",message: err.message, stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Unautorized",message: err.message, stackTrace: err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title:"server error",message: err.message, stackTrace: err.stack});
            break;
    
        default:
            break;
    }
    res.json({title:"Vaidation Failed",message: err.message, stackTrace: err.stack});

};

module.exports = errorHandler