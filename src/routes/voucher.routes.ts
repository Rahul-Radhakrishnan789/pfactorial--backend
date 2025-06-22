import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { voucherSchema } from '../validations/voucher.validations.js';
import { getAllUsers, getUserById } from '../controllers/auth.controller.js';
import { createVoucher ,deleteVoucher,getVoucherById,getVouchers,updateVoucher} from '../controllers/voucher.controller.js';
import { issueVouchers,getIssuedVouchers } from '../controllers/distribution.controller.js';

const router = Router();

router.use(authMiddleware);

//user
router.get("/get/users", getAllUsers);
router.get("/get/user/:id", getUserById);

// voucher
router.post('/create',validate(voucherSchema),createVoucher);
router.get('/get/all', getVouchers); 
router.get('/get/:id', getVoucherById); 
router.put('/update/:id', validate(voucherSchema), updateVoucher);
router.delete('/delete/:id', deleteVoucher);

router.post('/issue', issueVouchers);
router.get('/get/issued/vouchers', getIssuedVouchers);




export default router;