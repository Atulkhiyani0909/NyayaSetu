import { Router } from "express";
import { workerMiddleware } from "../middlewares/worker-auth.middleware.js";
import {getTickets, loginWorker, registerWorker, toggleTicket} from '../controllers/worker.controller.js'

const router =Router()


router.route('/register').post(registerWorker)
router.route('/login').post(loginWorker)
router.route('/get-tickets').get(workerMiddleware,getTickets)
router.route('/toggle-ticket/:id/:Status').get(workerMiddleware,toggleTicket)
 
export default router