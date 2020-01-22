const express=require('express');
//const cookieParser=require('cookie-parser');
const {check,validationResult } = require('express-validator');
const bodyParser=require('body-Parser');

const bcrypt=require('bcrypt');
const users=require('../models/user');

const router=express.Router();

router.get('/register',(req,res)=>{
  var messages=[];
  res.render('user/signup',{messages:messages,hasErrors:messages.length>0});
})
router.post('/register',[
    check('name',"name is require").not().isEmpty().withMessage(''),

    
    check('email',"Invalid email").not().isEmpty().isEmail().normalizeEmail(),
    //check('mobile').not().isEmpty(),
    check('mobile').not().isEmpty().isMobilePhone('en-IN'),
   // check(req.body.pass1).not().isEmpty()
    check('pass1','Your password must be at least 5 characters').not().isEmpty().isLength({min:5}),
   check('pass2').not().isEmpty(),
    check('pass2','Passwords do not match').custom((value, {req}) => (value === req.body.pass1)),],
    
    async(req,res)=>{
    const salt=await bcrypt.genSalt()
   
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        var messages=[];
        /*errors.foreach((error)=>{
            messages.push(error.msg);
        })
          */
         for(var i=0;i<errors.length;i++){
           console.log(errors[i].msg);
         }
          //console.log(messages);
        res.render('user/signup',{messages:messages});
       /* return res.status(320).json({
            status:0,
            error:errors.array()
        })*/
    }
    else{
        const hasedPassword=  await bcrypt.hash(req.body.pass1,salt);
    users.findOne({Email:req.body.email}).exec().then(user=>{
        if(user){
            /*return res.status(309).json({
            error:"Email Id already registered",
            status:0
            });*/
            messages.push("Email Id already registered");

        }
        else{
            users.findOne({Mobile:req.body.mobile}).exec().then(user=>{
                if(user){
                    return res.status(309).json({
                    error:"Mobile already registered",
                    status:0
                    });
                }
                else{

                    
                    //console.log(hasedPassword);
                    var newUser=users({
                        Name: req.body.name,
                        Email:req.body.email,
                        Mobile:req.body.mobile,
                        Password:hasedPassword
                    });
                    newUser.save()
                    .then(result => {
                        /*res.status(201).json({
                            status: 1,
                            msg: "You have been successfully registered :)"
                        });*/

                        
                        
                        res.redirect("/profile");
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(404).json({
                            status: 0,
                            error: "Internal Server Error"
                        });
                    });            
                   /* newUser.save(function(err) {
                        if (err) 
                        console.log(err);
                        res.status(300).json({
                            status:1,
                            msg:"registrtion sucessfull"
                        })
                        console.log('User saved successfully!');
                    });*/


                }
            
             }).catch(err => {
                console.log(err);
                res.status(404).json({
                    status: 0,
                    error: "Internal Server Error"
                });
            }); 
         }
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            status: 0,
            error: "Internal Server Error"
        });
    }); 
    /**/
    }
      
})

router.get('/login',[
    check('logemail',"Invalid email").not().isEmpty().isEmail().normalizeEmail(),
    check('logpass','password is required').not().isEmpty()
    ],(req, res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
        return res.status(320).json({
            status:0,
            error:errors.array()
        })

    }
    else{
        users.findOne({Email: req.body.logemail}).exec()
        .then(user => {
            console.log("User "+user);
            if(user){
                bcrypt.compare(req.body.logpass, user.Password, function(err, result) {
                    if(err){
                        return res.status(500).json({
                            status: 0,
                            error: "Internal server error"
                        });
                    }
                    if(result){
                        return res.json({
                            status:1,
                            msg:"suceessfully loggedin"
                        })
                    }
                    else{
                        return res.json({
                            status:0,
                            msg:"incorrect credentials "
                        })
                    }

                    //console.log(process.env.SECRET);
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(404).json({
                status: 0,
                error: "Internal Server Error"
            });
        });
    }

});

router.get('/profile',isLoggedIn,(req,res,next)=>{
  res.render('user/profile');
})
module.exports=router;

router.get('/logout',(req,res,next)=>{
  req.logout();
  res.redirect('/');
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next;
  }
  res.redirect('signup');
}
