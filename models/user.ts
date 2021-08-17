import { json } from "body-parser";
import { createBrotliCompress } from "zlib";

const fs=require('fs')
const path=require('path')
const p=path.join(path.dirname(process.mainModule?.filename),'data','users.json')
function pareadFile(cb:Function)
{
      fs.readFile(p,(err:NodeJS.ErrnoException,fileContent:Buffer)=>
      {
      
       cb(JSON.parse(fileContent.toString()))
       
 
      })
}
export class User
{
      id:string;
      firstName:string;
      middleName:string;
      lastName:string;
      email:string;
      phoneNumber:number;
      role:string;
      address:string;
      dateOfJoining:string;

      constructor(f:string,m:string,l:string,e:string,p:number,r:string,a:string,d:string)
      {
            this.id=Math.random().toString();
            this.firstName=f;
             this.lastName=l;
             this.middleName=m;
             this.email=e;
             this.phoneNumber=p;
             this.role=r;
             this.address=a;
             this.dateOfJoining=d;
      }
     save()
     {
           
           pareadFile((users:User[])=>
           {
                 users.push(this)
            fs.writeFile(p,JSON.stringify(users),(err:NodeJS.ErrnoException)=>
            {
                  console.log(err)
            })  
           })
         
           
     }
     static update(param:string,req:any,cd:Function)
     {
      
      
        pareadFile((users:any[])=>
        {    let message:string='No Record';
              console.log(users)
              console.log(param)
            const userIndex=users.findIndex(item=>item.id === param);
            if(userIndex >=0)
         {
               console.log("enter"); 
           users[userIndex]={id:users[userIndex].id.toString(),
            firstName:req.body.firstName,
            middleName:req.body.middleName,
            lastName:req.body.lastName,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            role:req.body.role,
            address:req.body.address,
            dateOfJoining:req.body.dateOfJoining,               
               }
               console.log(users)
               fs.writeFile(p,JSON.stringify(users),(err:NodeJS.ErrnoException)=>
               {
                     if(!err)
                    {message="Updated"
                    console.log(message,"cdcd")
                     cd(message); }
                    
               })}
               else
               {
                     cd(message);
               }
   }  )}
     static delete(param:string,cb:Function)
     {
       console.log("cdjbchjdsb")
      pareadFile((users:User[])=>
      {
            let previous_length=users.length
            users=users.filter(item=>item.id !==param)  
            if(users.length===previous_length)
            {
                  console.log("nhi hai record")
                  cb("No Record")
            }
             else{
                  fs.writeFile(p,JSON.stringify(users),(err:NodeJS.ErrnoException)=>
                  {
                        console.log(err)
                        cb("deleted")
                  })
             }
           
      })
       
      
     }
     static fetchAll(cb:Function)
     {
      fs.readFile(p,(err:NodeJS.ErrnoException,fileContent:Buffer)=>
      {
            if(err)
            {
                  cb([]);
            }
            else
            {
               cb(JSON.parse(fileContent.toString()))
            }
      })  
     }
}


