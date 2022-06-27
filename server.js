const express = require('express')
const connectDb = require('./config/db')

const app = express()
connectDb()

//Init Middelware
//allows you to get data from req.body
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('Api runing'))
//Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/post', require('./routes/api/post'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on ${PORT}`))
