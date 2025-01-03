import express from 'express';
import { 
  getAllDestinations, 
  getDestinationById, 
  createDestination, 
  updateDestination, 
  deleteDestination 
} from './destination.controller.js'; // استيراد وظائف الـ controller

const router = express.Router();

// جلب كل الوجهات السياحية
router.get('/', getAllDestinations);

// جلب وجهة سياحية حسب الـ ID
router.get('/:id', getDestinationById);

// إضافة وجهة سياحية جديدة
router.post('/createDestination', createDestination);

// تحديث وجهة سياحية حسب الـ ID
router.put('/:id', updateDestination);

// حذف وجهة سياحية حسب الـ ID
router.delete('/:id', deleteDestination);

export default router;
