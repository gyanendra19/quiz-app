const User = require('../Model/userModel')
const appError = require('../utils/appError')

exports.getUser = async(req, res) => {
    try{
        const user = await User.find()
    
        if(!user){
            return next(new appError('No users availaible', 204))
        }
    
        res.status(200).json({
            status: 'success',
            data: user
        })  
    }catch(err){
        return next(err)
    }
}

exports.updateMe =  async(req, res, next) => {

    try{
        const user = await User.findByIdAndUpdate(req.user._id, {
            name: req.body.name,
            photo: req.body.photo
        }, 
        {
            new: true,
            runValidators: true
        })
    
        res.status(200).json({
            status: "success",
            data: user
        })
        
    }catch(err){
        return next(err)
    }


}

exports.getMe =  async (req, res, next) => {
    try{
        const user = await User.findById(req.user._id)
    
        res.status(200).json({
            status: "success",
            data: user
        })

    }catch(err){
        return next(err)
    }

}