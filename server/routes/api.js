import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';
import { chatWithStylist, getDecision } from '../controllers/aiController.js';
import { getClothingList, getARConfig } from '../controllers/arController.js';

const router = express.Router();

// Product routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// AI Chatbot Route (Stylist)
router.post('/chat', chatWithStylist);

// Buy or Skip Decision Engine Route (Includes Sentiment)
router.get('/decision/:productId', getDecision);

// AR Fitting Room Routes
router.get('/clothing-list', getClothingList);
router.get('/ar-config', getARConfig);

export default router;
