const user = require("../models/user")
const bcrypt =require('bcrypt');
exports.register = async( req, res) => {
      
        let {name , email, password, dob } =req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();
        dob = dob.trim();
    
        if(name == "" || email == "" || password =="" || dob == "")
        {
            res.json({
                status: "FAILED",
                message: "Empty input fields!"
            });
        } else if (!/^[a-zA-Z]*$/.test(name)) {
            res.json({
                status: "FAILED",
                message: "invalid input name!"  
            })
        } else if ( !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            res.json({
                status: "FAILED",
                message: "invalid input email!"  
            })
        } else if( !new Date(dob).getTime()){
            res.json({
                status: "FAILED",
                message: "invalid input dob!"})  
        } else if(password.length < 8) {
            res.json({
                status: "FAILED",
                message: "password is too short!"  })
        }else {
            user.find({email}).then(result => {
                if (result.length){
                  res.json({
                    status : "FAILED",
                    message: "error: user exist"
                })
        } else {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds).then(hashedPassword =>{
                
                   const newuser = new user({
                       name,
                       email,
                       password: hashedPassword,
                       dob
                   });
                     newuser.save().then (result => {
                       
                       res.json({
                           status :"Success",
                           message: "registration successful"
                       })
                   })
                   .catch(err => {
                    
                       res.json({
                           status: "Failed",
                           message: "error occured while saving new user"
                       })
                   })
            })
            .catch(err=>{
                res.json({
                   status :"FAILED",
                   message: "error occured while hashing password"
                })
            })
           }
        }).catch(err => {
                console.log(err);
                res.json({
                    status :"FAILED",
                    message: "error occured while checking existing user"
                })
            })
        }     
}

exports.signin = async( req, res) => {
      
    let {email, password } =req.body;
         email = email.trim();
         password = password.trim();

    if(email == "" || password == "")
        {
            res.json({
                status: "FAILED",
                message: "Empty input fields!"
            });
        }else{
            user.find({email})
            .then(data => {
                if (data.length) {

                    const hashedPassword = data[0].password;
                    bcrypt.compare(password, hashedPassword).then(result =>{
                        if(result) {
                            res.json({
                                status : "sign-in successful",
                                
                            })
                        } else{
                            res.json({
                                status: "failed",

                            })
                        }
                    })
                    .catch(err =>{
                        res.json({
                            status: "failed",
                            message: "an error occurred while comparing"
                        })
                    })
                }else{
                    res.json({
                        status:"failed",
                        message : "invalid credentials entered"
                    })
                }
            })
            .catch(err =>{
                res.json({
                    status: "failed",
                    message: "an error occurred while checking the user"
                })
            })
        }
}