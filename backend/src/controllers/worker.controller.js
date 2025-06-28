import Worker from "../models/worker.model.js";
import jwt, { decode } from "jsonwebtoken"
import Tickets from '../models/ticket.model.js'
import mongoose from "mongoose";
import nodemailer from 'nodemailer'



const AccessAndRefreshToken =async (workerID)=>{
    try {
      const worker = await Worker.findById(workerID);
       const refreshToken = await Worker.generateRefreshToken();
       const AccessToken=await Worker.generateAccessToken();
       worker.refreshToken=refreshToken;
       await Worker.save({validateBeforeSave:false})
  
       return {AccessToken,refreshToken};
    } catch (error) {
      return error
    }
  }
  
  const registerWorker=async(req,res)=>{
   try {
     const {email,name,city,state,e_gov_id,department,password}=req.body;
      
     
     if(!req.body) return 'Error in getting Data'
   
     const newWorker=await Worker.create({
       email:email,
       name:name,
       location:{
         city:city,
         state:state
       },
       e_gov_id:e_gov_id,
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
      to: newWorker.email,
      subject: 'Welcome to NyayaSetu',
      html: `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome to <span style="color: #16A34A;">NyayaSetu</span>!</h2>
    <p>Dear ${newWorker.name},</p>
    <p>Your employee account has been <strong>successfully registered</strong>.</p>
    <p>You're now part of the mission to assist citizens in accessing legal and governmental services more efficiently.</p>
    <p>Kindly log in to view your assigned tasks, schedules, and responsibilities.</p>
    <br/>
    <p>We’re excited to have you onboard.</p>
    <p>– The NyayaSetu Team</p>
  </div>
`

    };

    await transporter.sendMail(message);

     if(!newWorker) return "Error in Saving Data To DB";
   
     const worker=await Worker.findById(newWorker._id).select('-password')
     
     let {AccessToken,refreshToken}=await AccessAndRefreshToken(worker._id);
    
     
   
     return res.status(201).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
       worker
     })
   } catch (error) {
    return res.status(400).json({
      error
    })
   }
  }
  
  const loginWorker=async(req,res)=>{
    try {
      let {email,password}=req.body;
      
    
      const worker=await Worker.findOne({
        email:email
      })
     
      
      const check=await worker.comparePassword(password);
      
      if(!check){
        return "Invalid Login Credentials"
      }
    
      const workers=await Worker.findOne({
        email:email
      }).select('-password -refreshToken')
    
    
      let {AccessToken,refreshToken}=await AccessAndRefreshToken(admin._id);
      
      return res.status(200).cookie('refreshToken',refreshToken).cookie('accessToken',AccessToken).json({
          workers
      })
    } catch (error) {
      return res.status(400).json({
        error
      })
    }
  }


const getTickets=async(req,res)=>{
    const id=req.userId;

    try {
        const worker=await Worker.findById(id).select('-password -refreshToken');
    
        if(!worker) return "No Worker Found"
     
        let city=worker.location.city;
    
        const tickets=await Tickets.find({
            department:worker.department,
            'location.city':city
        })
    
        return res.status(200).json({
            tickets
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}


const toggleTicket=async(req,res)=>{
    try {
      const {id,Status}=req.params;
      
      const ticket=await Tickets.findById(id);
      
      ticket.Status=Status;
      await ticket.save({validateBeforeSave:false});
  
       return res.status(200).json({
          ticket
       })
    } catch (error) {
      return res.status(400).json({
        error
      })
    }
}


export {getTickets ,loginWorker , registerWorker ,toggleTicket}