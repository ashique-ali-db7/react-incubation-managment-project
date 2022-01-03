const express = require('express')

const router = express.Router();

const userHelpers = require('../helpers/userHelper');

const asyncHandler = require('express-async-handler');
const { response } = require('express');

// Routes
// post signup
router.route('/signup')
.post(asyncHandler(async(req,res)=>{

    userHelpers.signupPost(req.body).then((response)=>{
       if(response.users){
        res.status(409);
           res.json({message:"Entered company already exist"})
      
       }else{

        res.status(201).json({message:"user registered"})
                
       }
    })
}));


// post login

router.route('/login')
.post(asyncHandler(async(req,res)=>{
   
    userHelpers.loginPost(req.body).then((response)=>{
        if(response.exist){
       
            res.send(response)
          
        }else{
    
            res.status(401)
           res.json({message:"Invalid user name or password"})
        }
    })
}));


//post application
router.route('/application')
.post(asyncHandler(async(req,res)=>{

  userHelpers.applicationPost(req.body).then((response)=>{
if(response.ok){
    res.status(200);
    res.json({message:"Application sucessfully submited"})
}else{
    res.status(400)
    res.json({message:"failed to register"})
}
  })
}))
.get(asyncHandler(async(req,res)=>{
userHelpers.applicationGet(req.query).then((response)=>{

if(response.exist){
    console.log("monepppppppppppppppppp");
console.log(response.user);
res.send(response.user)

}else{
    res.status(401);
    res.json({message:"application does not exist"})
}

})
  
}))




router.route('/adminlogin')
.post(asyncHandler(async(req,res)=>{
 
    userHelpers.adminLoginPost(req.body).then((response)=>{
        if(response.ok){
          
            res.send(response)


        }else{
            res.status(401)
           res.json({message:"Invalid phone number or password"})

        }
    })
}))


router.route('/getNewApplication')
.get(asyncHandler(async(req,res)=>{

   userHelpers.getNewApplication().then((response)=>{
      
       res.send(response)
   })
   

}))


router.route('/singleApplication')
.get(asyncHandler(async(req,res)=>{


   
 userHelpers.getSingleApplication(req.query).then((response)=>{
   
    if(response){
        res.send(response)
    } else{
        res.status(400);
        res.json({message:"some error occured"})
    }
   

 })

}))

.patch(asyncHandler(async(req,res)=>{
   userHelpers.editStatus(req.body).then(()=>{
       res.status(200)
       res.json({message:"status changed"})
   })
}));



router.route('/getPendingApplication')
.get(asyncHandler(async(req,res)=>{

 userHelpers.getPendingApplication().then((response)=>{

   
     
       res.send(response)
   

 })


}))



router.route('/getApprovedApplications')
.get(asyncHandler(async(req,res)=>{


userHelpers.getApprovedApplication().then((response)=>{
console.log("kokok");
console.log(response);
res.send(response)

})

}))


router.route('/bookSlot')
.get(asyncHandler(async(req,res)=>{
    userHelpers.patchBookSlot(req.query).then(()=>{

res.json({message:"ok"})

    })
}))



router.route('/getApprovedandBookedApplications')
.get(asyncHandler(async(req,res)=>{


userHelpers.getApprovedandBookedApplications().then((response)=>{
 console.log("8888");
 console.log(response);
    res.send(response)
})

}))



router.route('/getAllApplications')
.get(asyncHandler(async(req,res)=>{
 userHelpers.getAllApplication().then((response)=>{

   res.send(response)

 })

}))

module.exports = router;