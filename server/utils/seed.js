import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';

dotenv.config({ path: '../.env' });

connectDB();

const mockProducts = [
  {
    name: "Urban Premium Hoodie",
    description: "Relaxed fit hoodie crafted from heavyweight ultra-soft cotton. Features a sleek minimalist design suitable for any casual outing.",
    price: 1499,
    category: "Hoodies",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    rating: 4.8
  },
  {
    name: "Classic Denim Jacket",
    description: "Vintage wash denim jacket with silver hardware. A timeless wardrobe essential that pairs with almost anything.",
    price: 2299,
    category: "Jackets",
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=600&auto=format&fit=crop",
    rating: 4.5
  },
  {
    name: "SportTech Running Shoes",
    description: "Lightweight and breathable sneakers with active suspension technology for all-day comfort.",
    price: 3499,
    category: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    rating: 3.8
  },
  {
    name: "Summer Linen Shirt",
    description: "Breathable 100% linen shirt perfect for hot summer days. Smart casual look with a relaxed collar.",
    price: 1299,
    category: "Shirts",
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=600&auto=format&fit=crop",
    rating: 4.2
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Review.deleteMany();

    const createdProducts = await Product.insertMany(mockProducts);
    
    console.log('Data Imported successfully! Added', createdProducts.length, 'products.');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error.message);
    process.exit(1);
  }
};

importData();
