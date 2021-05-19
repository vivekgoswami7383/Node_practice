const express = require('express')
const app = express()
require('./Database/mongoose')
const UserRouter = require('./router/app')
const port = 8000

app.use(express.json())

app.use(UserRouter)

app.listen(port, () => {
	console.log(`server up on 8000`);
})