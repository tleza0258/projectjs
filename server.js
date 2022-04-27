require('dotenv').config();
const express = require('express')
const session = require('express-session')
const path = require('path')
const router = require('./routes/myRouter')
const mongoose = require('mongoose')
const app = express()

const DATABASE_URL = process.env.DATABASE_URL
mongoose.connect( DATABASE_URL,{
  useNewUrlParser : true,
  useUnifiedTopology : true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))


app.use(
  session({
    secret: 'my_super_secret$%@#$#fsdfqew',
    resave: false,
    saveUninitialized: false
  })
)
app.use(router)

app.use(express.static(path.join(__dirname,'public')))
app.listen(3000,() =>{
    console.log("รัน server ที่ port 3000")
})