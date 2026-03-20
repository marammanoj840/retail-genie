import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Star } from 'lucide-react';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from backend
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading your personalized styles...</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
            AI Top Picks
          </h1>
          <p className="text-gray-500 mt-2">Curated just for your style and budget.</p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link key={product._id} to={`/products/${product._id}`} className="group block h-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full transform group-hover:-translate-y-1">
              <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {product.rating}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1 mt-1">{product.category}</p>
                </div>
                <div className="mt-4 font-bold text-lg">₹{product.price}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
          No products exactly match your recent AI query. Try asking the Stylist!
        </div>
      )}
    </div>
  );
}
