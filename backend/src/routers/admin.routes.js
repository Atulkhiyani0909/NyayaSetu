import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin-auth.middleware.js";
import { allTickets, allWorker, filter_by_query, loginAdmin, registerAdmin, tickets_information } from "../controllers/admin.controller.js";

const router=Router();

router.route('/register').post(registerAdmin)

router.route('/login').post(loginAdmin)

router.route('/get-workers').get(adminMiddleware,allWorker)



//for test only
router.route('/allTickets').get(adminMiddleware,allTickets);

//sorting routes
router.route('/filter-by-query/:query').get(adminMiddleware,filter_by_query)

router.route('/tickets/:ticket_status').get(adminMiddleware,tickets_information)

export default router
