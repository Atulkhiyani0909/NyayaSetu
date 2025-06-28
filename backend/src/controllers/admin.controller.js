import Admin from '../models/admin.model.js'
import Worker from '../models/worker.model.js' 
import Ticket from '../models/ticket.model.js';
import jwt, { decode } from "jsonwebtoken"
import mongoose from 'mongoose';
import nodemailer from 'nodemailer'


const AccessAndRefreshToken =async (adminID)=>{
  try {
    const admin = await Admin.findById(adminID);
     const refreshToken = await admin.generateRefreshToken();
     const AccessToken=await admin.generateAccessToken();
     admin.refreshToken=refreshToken;
     await admin.save({validateBeforeSave:false})

     return {AccessToken,refreshToken};
  } catch (error) {
    return error
  }
}

const registerAdmin=async(req,res)=>{
  const {email,name,city,state,gov_id,department,password}=req.body;
   
  console.log(req.body);
  
  if(!req.body) return 'Error in getting Data'

  const newAdmin=await Admin.create({
    email:email,
    name:name,
    location:{
      city:city,
      state:state
    },
    gov_id:gov_id,
    department:department,
    password:password
  })

 
     const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: process.env.EMAIL_USER,
      to: newAdmin.email,
      subject: 'Welcome to NyayaSetu',
    html: `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome, ${newAdmin.name} – <span style="color: #16A34A;">NyayaSetu</span></h2>
    <p>Dear Administrator,</p>
    <p>Your admin account has been <strong>successfully created</strong> on the NyayaSetu platform.</p>
    <p>You now have access to manage users, oversee platform activity, and ensure smooth operations across departments.</p>
    <p>Please make sure to keep your credentials secure and regularly review platform updates.</p>
    <br/>
    <p>Thank you for serving with NyayaSetu.</p>
    <p>– The NyayaSetu Team</p>
  </div>
`
    };


    await transporter.sendMail(message);


  if(!newAdmin) return "Error in Saving Data To DB";

  const admin=await Admin.findById(newAdmin._id).select('-password')
  
  
  let {AccessToken,refreshToken}=await AccessAndRefreshToken(admin._id);
 
  

  return res.status(201).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
    admin
  })
}

const loginAdmin=async(req,res)=>{
  let {email,password}=req.body;
  console.log(req.body);
  

  const admin=await Admin.findOne({
    email:email
  })
 
  
  const check=await admin.comparePassword(password);
  
  if(!check){
    return "Invalid Login Credentials"
  }

  const admins=await Admin.findOne({
    email:email
  }).select('-password -refreshToken')


  let {AccessToken,refreshToken}=await AccessAndRefreshToken(admin._id);
  console.log(AccessToken);
  
  
  return res.status(200).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
      admins
  })
}

const allWorker = async (req, res) => {
   const {id}=req.query;
    try {
      const admin =await Admin.findById(id);

      if(!admin) return "Admin Doesn't Exists"
       
      let city =admin.location.city;

      const workers = await Worker.find({
        department: admin.department,
        'location.city': city , // to check for the city and department 
      }).sort({ratings:-1}).select('-password -refreshToken');
      
      if(!workers) return "No Worker Found"

     return res.status(200).json({
        workers
     });
    } catch (error) {
      console.log("Error in Data", error);
    }
};



//for demo 
const allTickets=async(req,res)=>{
  try {
    const tickets=await Ticket.find({});
    return res.status(200).json(tickets);
  } catch (error) {
    console.log(error);
    
    return res.status(400).json({
      error , message:"Error in getting tickets"
    });
  }
}


const filter_by_query=async(req,res)=>{
  try {
    // this can be done by passing the query from the frontend
    
    const query=req.params.query
    
    const result=await Ticket.aggregate([ 
    {
      $group:{
        _id:`$${query}`,
        count:{$sum:1}
      }
    },
    {
      $sort:{count:-1}
    }

  ])

  console.log("This is the combined ",result);
  return res.json({result})
  
  } catch (error) {
    return res.json("Error " , error)
  }
}

const tickets_information=async (req,res) => {
  
  const {ticket_status}=req.params
  
  try {
    const result=await Ticket.find({
      status:`${ticket_status}`
    })

    return res.json({
      tickets:result
    })
  } catch (error) {
    return res.json("Error ",error)
  }
} 

export {allWorker,registerAdmin,loginAdmin,allTickets,filter_by_query,tickets_information}