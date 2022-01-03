var db = require('../config/connection');
var collections = require('../config/collection');
var objectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


module.exports={

    signupPost:(data)=>{
return new Promise(async(resolve,reject)=>{
let result={};

let salt = await bcrypt.genSalt(10);
data.password = await bcrypt.hash(data.password, salt)

   
    

    let user  = await db.get().collection(collections.USERS_DETAILS_COLLECTION).findOne({companyname:data.companyname});
  console.log(user);
     if(user){

 result.users = true;
 resolve(result)
     }else{
         db.get().collection(collections.USERS_DETAILS_COLLECTION).insertOne({companyname:data.companyname,password:data.password,phone:data.phone,country:data.country});
        
         result.companyname = data.companyname;
         resolve(result)
     }


})

 

},

loginPost:(data)=>{
return new Promise(async(resolve,reject)=>{
   
    let result = {}
    let user = await db.get().collection(collections.USERS_DETAILS_COLLECTION).findOne({companyname:data.logincompanyname})
   if(user){
    console.log("14");
       console.log(user);
    bcrypt.compare(data.loginpassword, user.password).then((status) => {

        if (status) {
         
            result.token = generateToken(user._id)
            result.user = user;
            result.exist = true;
            resolve(result)
        } else {
          
            result.exist = false;
            resolve(result);
        }
    })
   }else{
       
    result.exist = false;
    resolve(result);
   }
})
},

applicationPost:(data)=>{
let result={}
return new Promise(async(resolve,reject)=>{
 
    db.get().collection(collections.APPLICATIONS_DETAILS_COLLECTION).insertOne(data).then((response)=>{
        result.ok = true
        resolve(result)
    })
    

})
},
applicationGet:(data)=>{
    console.log("hihihiooo");
    console.log(data);
    let result = {}

    return new Promise(async(resolve,reject)=>{

let user = await db.get().collection(collections.APPLICATIONS_DETAILS_COLLECTION).findOne({userId:data.userId})
if(user){
   
    result.exist = true;
    result.user = user
    resolve(result)
}else{
    console.log("menot");
    result.exist = false;
    resolve(result)
}
    })
},
adminLoginPost:(data)=>{
    data.phone = Number(data.phone)
    let result = {}
    return new Promise(async(resolve,reject)=>{
        let user = await db.get().collection(collections.ADMIN_DETAILS_COLLECTION).findOne({phone:data.phone,password:data.password})
        console.log(user);
        if(user){

     result.ok = true
     result.token = generateToken(user._id)
     resolve(result);

        }else{
            result.ok = false;
            resolve(result);

        }
    })
},

getNewApplication:()=>{
    return new Promise(async(resolve,reject)=>{
       let newApplication =  await  db.get().collection(collections.APPLICATIONS_DETAILS_COLLECTION).find({status:"process"}).toArray();
       resolve(newApplication);
    })
},

getSingleApplication:(data)=>{
console.log("ppp");
console.log(data);
  return new Promise(async(resolve,reject)=>{

 let singleApplcationDetails =await db.get().collection(collections.APPLICATIONS_DETAILS_COLLECTION).findOne({_id:objectId(data.applicationId)})
 console.log("123momo");
 console.log(singleApplcationDetails);
 resolve(singleApplcationDetails)

  })

},

editStatus:(data)=>{

return new Promise(async(resolve,reject)=>{

    db.get().collection(collections.APPLICATIONS_DETAILS_COLLECTION).updateOne({_id:objectId(data._id)},{$set:{status:data.status}})

    resolve();
})


},


getPendingApplication:()=>{

return new Promise(async(resolve,reject)=>{

    let pendingApplication =  await  db.get().collection(collections.APPLICATIONS_DETAILS_COLLECTION).find({status:"pending"}).toArray();
    console.log("456");
    console.log(pendingApplication);
    resolve(pendingApplication);


})

},


getApprovedApplication:()=>{

return new Promise(async(resolve,reject)=>{


let getApprovedApplication = await db.get().collection(collections.APPLICATIONS_DETAILS_COLLECTION).find({status:"approve"}).toArray();

resolve(getApprovedApplication)

})

},

patchBookSlot:(data)=>{

return new Promise(async(resolve,reject)=>{
  db.get().collection(collections.APPLICATIONS_DETAILS_COLLECTION).updateOne({companyname:data.bookslot},{$set:{status:"booked",slotno:data.slotno}});
  resolve()

})
    
},

getApprovedandBookedApplications:()=>{

    return new Promise(async(resolve,reject)=>{


        let getBookedApplications = await db.get().collection(collections.APPLICATIONS_DETAILS_COLLECTION).find({status:"booked"}).toArray();
        console.log("lplppl000");
        console.log(getBookedApplications);
        resolve(getBookedApplications)
        
        })


},


getAllApplication:()=>{
    return new Promise(async(resolve,reject)=>{
       let allApplication =  await  db.get().collection(collections.APPLICATIONS_DETAILS_COLLECTION).find({}).toArray();
       resolve(allApplication);
    })
},


}

