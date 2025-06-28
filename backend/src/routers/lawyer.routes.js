import {Router} from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import { lawyerMiddleware } from '../middlewares/lawyer-auth.middleware.js'
import { getCallHistory, lawyerProfile, loginLawyer, registerLawyer, updateCall, updateFees,allLawyers} from '../controllers/lawyer.controller.js'

const router=Router()

router.route('/register').post(
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'ID_proof', maxCount: 1 }
    ]),
    registerLawyer
  );
  


    router.route('/login').post(loginLawyer)

    router.route('/update-fees').put(lawyerMiddleware,updateFees)

    router.route('/get-call-history').get(lawyerMiddleware,getCallHistory)

    router.route('/update-call/:Call_id').put(lawyerMiddleware,upload.single('proof'), updateCall);
    
    
    router.route('/profile/:id').get(lawyerProfile);
    
    router.route('/get-lawyers').get(allLawyers)



export default router