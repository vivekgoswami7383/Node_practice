const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/NewData',{
	useNewUrlParser : true,
	useUnifiedTopology : true,
	useCreateIndex : true
}).then((data)=>{
	console.log('Database Connected');
}).catch((Error)=>{
	console.log(Error);
})