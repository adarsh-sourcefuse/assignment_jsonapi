
import {User} from '../models/user'


exports.getUsers=(req:any,res:any)=>
{
    User.fetchAll((users:any)=>
        {
            res.status(200).json({users:users})
        })
    
}

exports.addUser=(req:any,res:any)=>
{
    const newUser=new User(req.body.firstName,req.body.middleName,req.body.lastName,req.body.email,req.body.phoneNumber,req.body.role,
        req.body.address,req.body.dateOfJoining )
      
      newUser.save()
  
    res.status(200).json({message:"added user"})
}
exports.updateUser=(req:any,res:any)=>
{
  const uid=req.params.userId;
  console.log(uid)
  User.update(uid,req,(message:string)=>
   {
    return res.status(200).json({message:message})
   })   
   
   
   
}
exports.deleteUser=(req:any,res:any)=>
{
    const uid=req.params.userId;
    User.delete(uid,(message:string)=>
    {
        res.status(200).json({message:message})
    });
   
}
