const express = require('express')
const router = express.Router()
const User = require('../models/dbtest')


const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
    return res.redirect('/login');
    }
    next()
}

router.get('/',isLoggedIn,(req,res)=>{
    res.render('/checkroom')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

//login post
router.post('/login',async (req, res) => {
    const{userID,password} = req.body
    const user = await User.findOne({
        userID,
        password
    })
    console.log(userID)
    console.log(password)
    if (user){
        req.session.user = user
        return res.render('checkroom')
    }else{
        return res.render('login')
    }
})


router.get('/register',(req,res)=>{
    res.render('register')
})

router.get('/checkroom',(req,res)=>{
    res.render('checkroom')
})

router.get('/rent',(req,res)=>{
    res.render('rent')
})
router.get('/modify',(req,res)=>{
    res.render('modify')
})

router.get('/success',(req,res)=>{
    res.render('success')
})

router.post('/register', async (req, res) => {
    const {userID,password,name,address,email} = req.body

    const user = new User({
        userID,password,name,address,email
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch (err) {
        res.status(400).json({ message: err.message })
    }
}) 

router.get('/logout',(req,res)=>{
    req.session = null
    res.redirect('/login')
})


module.exports = router