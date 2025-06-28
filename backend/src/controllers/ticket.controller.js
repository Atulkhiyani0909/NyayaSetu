import Ticket from "../models/ticket.model.js";
import User from "../models/user.model.js";
import  generateAndSendComplaintPDF  from "../utils/generateAndSendComplaintPDF.js";
const createTicket = async (req, res) => {
    try {
        const userId = req.userId;


        const {
            title,
            department,
            description,
            city,
            state,
            category,
        } = req.body;

        // If file was uploaded, get its path or filename
        // let evidence = null;
        // if (req.file) {
        //     evidence = req.file.path; // or req.file.filename
        // }

        const ticketData = {
            title,
            department,
            description,
            category,
            location: { city, state },
            owner: userId
        };

        const ticket = new Ticket(ticketData);
        await ticket.save();

        const user = await User.findById(userId).select('name email');
        
        await generateAndSendComplaintPDF(user, ticket);

        return res.status(201).json({
            message: "Ticket created successfully and PDF emailed.",
            ticket,
        });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return res.status(400).json({ message: "Failed to create ticket", error });
    }
};

const getUserTickets = async (req, res) => {
    try {
        const userId = req.userId;

        const tickets = await Ticket.find({ owner: userId });

        return res.status(200).json({
            message: "Tickets fetched successfully",
            tickets,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tickets", error });
    }
};

export { createTicket, getUserTickets };