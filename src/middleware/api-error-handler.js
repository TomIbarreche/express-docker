const ApiError = require('../error/ApiError');

function apiErrorHandler(err, req, res, next) {

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return ;
    }
    console.log("OUPSI")
    res.status(500).json('something went wrong');
}

module.exports = apiErrorHandler;