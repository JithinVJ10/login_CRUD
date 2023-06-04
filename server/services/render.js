const axios = require('axios');
const Userdb = require('../model/model');


const adminCred={
    name:"admin",
    password:"123"
}

exports.homeRoutes = (req, res) => {
    if (req.session.user=="admin") {
        // Make a get request to /api/users
        axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
    }else if (req.session.user) {
        res.render("home")
    }else{
        res.render("adminLogin")
    }  
}

exports.signup = (req,res) => {
    if (req.session.user) {
        res.redirect("/")
    }else{
        res.render("signup")

    }
}
// user and admin - login
exports.login = async(req,res) =>{
    let name = req.body.name
    let password = req.body.password

    if (!name || !password) {
    
        let msg = "Name and password are required"
        return res.render("adminlogin",{msg})
    }

    if (adminCred.name == name && adminCred.password == password) {
        
        req.session.user = req.body.name
        return res.redirect("/")
    }
    const user = await Userdb.findOne({ name: name, password: password });
  
    if (!user) {
   
      let msg = "Invalid username or password"
      return res.render("adminLogin",{msg})
    }
  
      // If the username and password are valid, redirect the user to the home page

    req.session.user = {
        name: name
    }
    
    res.render("home")
        
}

exports.signupUser = async (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name ||!email || !password) {
        // return res.status(400).send("Name and password are required");
        let msg = "Please fill the details"
        return res.render("signup",{msg})
    }

    if (typeof name !=="string") {
        // return res.status(400).send("Name and password are required");
        let msg = "Entered name is not a string"
        return res.render("signup",{msg})
    }

    const data ={
        name: name,
        email: email,
        password: password
    }

    await Userdb.insertMany([data])

    res.redirect("/")
}

exports.logout = (req,res)=>{
    req.session.user = null
    res.redirect("/")
}

exports.add_user = (req, res) =>{
    if(req.session.user){
        res.render('add_user');
    }else{
        res.redirect('/')
    }
    
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}