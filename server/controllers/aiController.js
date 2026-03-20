import { GoogleGenAI } from '@google/genai';
import Product from '../models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'fake-api-key' });

export const chatWithStylist = async (req, res) => {
  try {
    const { message } = req.body;
    
    // For demo purposes when API key is missing
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
      return res.json({ 
        reply: `(Mock Mode) I see you're looking for "${message}". As an AI Stylist, I recommend checking out our latest arrivals which match that description perfectly!` 
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are Retail-Genie, an expert AI fashion stylist. Keep your response brief, engaging, and under 2 sentences. User says: "${message}"`
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI' });
  }
};

export const getDecision = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    // Simulate Gemini Sentiment Analysis & Decision Engine
    const verdict = product.rating >= 4.0 ? 'BUY' : 'SKIP';
    const reason = product.rating >= 4.0 
      ? `Based on strong positive reviews (${product.rating} stars) and the price of ₹${product.price}, this is a great deal.`
      : `With a rating of ${product.rating} stars, we recommend waiting or looking for alternatives in the ${product.category} category.`;
      
    res.json({
      verdict,
      reason,
      sentiment: {
        positive: product.rating >= 4.5 ? 85 : product.rating >= 4.0 ? 70 : 40,
        neutral: 15,
        negative: product.rating >= 4.5 ? 0 : product.rating >= 4.0 ? 15 : 45
      }
    });
  } catch (error) {
    console.error('Decision engine error:', error);
    res.status(500).json({ error: 'Failed to generate decision' });
  }
};
