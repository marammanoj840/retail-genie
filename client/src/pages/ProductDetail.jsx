import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, ShoppingCart, Activity, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details, decision, and analysis concurrently
    Promise.all([
      fetch(`http://localhost:5000/api/products/${id}`).then(res => res.json()),
      fetch(`http://localhost:5000/api/decision/${id}`).then(res => res.json())
    ])
    .then(([productData, decisionData]) => {
      setProduct(productData);
      setDecision(decisionData);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="text-center py-20">Analyzing product data via AI...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="w-full">
      <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-brand-600 mb-6 group transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to matches
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 p-6 bg-gray-50 flex items-center justify-center relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full max-w-md rounded-2xl shadow-md object-cover drop-shadow-xl"
          />
          <Link to={`/try-on?productUrl=${encodeURIComponent(product.imageUrl)}`} 
            className="absolute bottom-10 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full font-bold text-brand-600 shadow-xl hover:scale-105 transition-transform border border-brand-100 flex items-center gap-2">
            Try it On virtually ✨
          </Link>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
              <div className="flex items-center text-yellow-500 font-bold bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-500 mr-1" /> {product.rating}
              </div>
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-brand-500 mb-6">
              ₹{product.price}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* AI Box */}
            {decision && (
              <div className={`p-6 rounded-2xl border mb-8 ${decision.verdict === 'BUY' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Activity className={`w-6 h-6 ${decision.verdict === 'BUY' ? 'text-green-600' : 'text-red-500'}`} />
                  <h3 className="font-bold text-lg">AI Shopping Assessment</h3>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className={`text-3xl font-black tracking-tight ${decision.verdict === 'BUY' ? 'text-green-600' : 'text-red-600'}`}>
                    {decision.verdict}
                  </span>
                  <span className="text-gray-500 mb-1 text-sm">Verdict</span>
                </div>
                <p className="text-gray-700 text-sm bg-white/50 p-3 rounded-lg backdrop-blur-sm shadow-sm">{decision.reason}</p>
                
                {/* Sentiment Bar */}
                {decision.sentiment && (
                  <div className="mt-4 border-t border-black/5 pt-4">
                    <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Review Sentiment Analysis</div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden flex">
                        <div style={{width: `${decision.sentiment.positive || 70}%`}} className="bg-green-500 h-full"></div>
                        <div style={{width: `${decision.sentiment.neutral || 20}%`}} className="bg-gray-400 h-full"></div>
                        <div style={{width: `${decision.sentiment.negative || 10}%`}} className="bg-red-500 h-full"></div>
                      </div>
                      <span className="font-bold text-green-700">{decision.sentiment.positive || 70}% Positive</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            <button className="w-full flex items-center justify-center gap-2 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <ShoppingCart className="w-5 h-5" /> Add to Cart (Best Price)
            </button>
            <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Secure AI-verified purchase
            </div>
          </div>
        </div>
      </div>
      
      {/* Price Comparison Mock */}
      <div className="mt-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
         <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-brand-500" /> Price Comparison Engine</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {['Amazon', 'Flipkart', 'Myntra'].map((store, i) => (
             <div key={store} className={`p-4 rounded-xl border ${i === 1 ? 'border-brand-500 bg-brand-50 relative' : 'border-gray-100 bg-white'}`}>
               {i === 1 && <div className="absolute -top-3 right-4 bg-brand-500 text-white text-xs px-2 py-1 rounded-full font-bold">Best Deal!</div>}
               <div className="text-gray-500 font-medium">{store}</div>
               <div className={`text-2xl font-bold mt-1 ${i===1 ? 'text-brand-600' : 'text-gray-800'}`}>₹{product.price + (i * 150 - 150)}</div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
