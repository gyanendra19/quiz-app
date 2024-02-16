class appError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'Error' : 'Fail'
    }
}

module.exports = appError