import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';
import { chatWithStylist, getDecision } from '../controllers/aiController.js';

const router = express.Router();

// Product routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// AI Chatbot Route (Stylist)
router.post('/chat', chatWithStylist);

// Buy or Skip Decision Engine Route (Includes Sentiment)
router.get('/decision/:productId', getDecision);

export default router;
