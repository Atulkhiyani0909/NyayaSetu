import Call from '../models/calls.model.js'

// In this call is being saved to the DB

const intiate_call=async(req,res)=>{
    try {
        const {lawyerId}=req.params
        
        
        const user_ID=req.userId
        

        const newCall=await Call.create({
            userID:user_ID,
            LawyerID:lawyerId
        })

        if(!newCall) return "Error in Saving Call to DB"

        return res.json({
            history:newCall
        })
    } catch (error) {
        console.log(error);
        return res.json("Error ",error)
    }
}

export {intiate_call}