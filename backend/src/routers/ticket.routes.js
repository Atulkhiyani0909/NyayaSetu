import { Router } from "express";
import { createTicket, getUserTickets } from "../controllers/ticket.controller.js";
import { userMiddleware } from "../middlewares/user-auth.middleware.js";

const router = Router();

router.post("/create", userMiddleware, createTicket);
router.get("/my-tickets", userMiddleware, getUserTickets);

export default router;
