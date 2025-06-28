import Call from '../models/calls.model.js';

const intiate_call = async (req, res) => {
  try {
    console.log('Function');
    
    const { lawyerId } = req.params;
    const user_ID = req.userId;

    if (!user_ID) {
      return res.status(401).json({ error: "Unauthorized: userId missing" });
    }
    if (!lawyerId) {
      return res.status(400).json({ error: "Bad Request: lawyerId missing" });
    }

    const newCall = await Call.create({
      userID: user_ID,
      LawyerID: lawyerId
    });

    if (!newCall) {
      return res.status(500).json({ error: "Error in Saving Call to DB" });
    }

    return res.json({
      history: newCall
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export { intiate_call };