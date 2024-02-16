const User = require('../Model/userModel')
const jwt = require('jsonwebtoken')
const appError = require('../utils/appError')


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET_CODE, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

const createTokenAndCookie = (user, statusCode, res) => {
    const token = signToken(user._id)

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
        httpOnly: true
    }


    res.cookie('jwt', token, cookieOptions)
    res.status(statusCode).json({
        status: 'success',
        token,
        data: user
    })
}

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            phone: req.body.phone,
            photo: req.body.photo,
        })

        createTokenAndCookie(newUser, 201, res)
    } catch (err) {
        return next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        let user;
        const { email, phone, password } = req.body;

        if ((!email && !phone) || !password) {
            return next(new appError('Please provide email/phone or password', 401))
        }

        if (email) {
            user = await User.findOne({ email })
        } else {
            user = await User.findOne({ phone })
        }

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new appError('Invalid email/phone or password', 400))
        }

        createTokenAndCookie(user, 201, res)

    } catch (err) {
        return next(err)
    }
}

exports.protect =  async (req, res, next) => {
    try{

        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }else if(req.cookies.jwt && req.cookies.jwt !== 'loggedOut'){
            token = req.cookies.jwt;
        }
    
        if(!token){
            return next(new appError('You are not logged in', 401))
        }
    
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_SIGN)
        const currentUser = await User.findById(decoded.id)
    
        if(!currentUser){
            return next(new appError('No user with this token', 404))
        }
    
        if(currentUser.passwordChangedAfter(decoded.iat)){
            return next(new appError('Password changed. Login again', 403))
        }
    
        req.user = currentUser
        next()
    }catch(err){
        return next(err)
    }
}
