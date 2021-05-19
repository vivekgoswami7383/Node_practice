const jwt = require('jsonwebtoken')
const User = require('../Model/user')

const auth = async (req,res,next)=>{
	try{
		const token = req.header('Authorization').replace('Bearer ','').trim()
		const verify = jwt.verify(token,'MySecretKey')
		const user = await User.findOne({_id : verify._id})
		if(!user){
			throw new Error('User Not Found')
		}
		req.user = user
		req.token = token
		next()
        
	}catch(error){
		res.status(404).send('unable')
	}
}

module.exports = auth

