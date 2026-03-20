import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';

const REAL_PRODUCTS = [
  { 
    id: 'g1', 
    name: 'Aviator Classic', 
    type: 'face', // Normalized type
    price: 149.00,
    url: 'https://cdn-icons-png.flaticon.com/512/624/624829.png',
    description: 'High-quality polaroid lenses with titanium frame.'
  },
  { 
    id: 'g2', 
    name: 'Wayfarer Stealth', 
    type: 'face', // Normalized type
    price: 189.99,
    url: 'https://cdn-icons-png.flaticon.com/512/3021/3021796.png',
    description: 'Matte black finish with UV400 protection.'
  },
  { 
    id: 'h1', 
    name: 'Urban Premium Cap', 
    type: 'head', // Normalized type
    price: 45.00,
    url: 'https://cdn-icons-png.flaticon.com/512/862/862856.png',
    description: '100% Cotton, adjustable strap, breathable mesh.'
  },
  {
    id: 's1',
    name: 'Luxe Cotton Shirt',
    type: 'body', // Normalized type
    price: 79.99,
    url: 'https://cdn-icons-png.flaticon.com/512/2612/2612241.png',
    description: 'Slim fit, breathable organic cotton for all-day comfort.'
  },
  {
    id: 'j1',
    name: 'Tech-Shell Jacket',
    type: 'body', // Normalized type
    price: 129.50,
    url: 'https://cdn-icons-png.flaticon.com/512/2906/2906857.png',
    description: 'Waterproof, wind-resistant outer shell with smart thermals.'
  }
];

export default function ProductSelector({ selectedId, onSelect }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg text-on-surface">Premium Catalog</h3>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold flex items-center gap-1 uppercase tracking-tighter">
          <ShieldCheck className="w-3 h-3" /> Certified Authentic
        </span>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {REAL_PRODUCTS.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelect(product)}
            className={`group relative overflow-hidden text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
              selectedId === product.id 
                ? 'border-primary bg-primary/5 shadow-lg' 
                : 'border-outline-variant bg-surface hover:border-primary/40 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center p-2 transition-transform group-hover:scale-110 ${
                selectedId === product.id ? 'bg-white shadow-inner' : 'bg-surface-container'
              }`}>
                <img src={product.url} alt={product.name} className="w-full h-full object-contain filter drop-shadow-md" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-bold text-sm ${selectedId === product.id ? 'text-primary' : 'text-on-surface'}`}>
                    {product.name}
                  </h4>
                  {selectedId === product.id && <Check className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-[10px] text-on-surface-variant line-clamp-1 mt-0.5">{product.description}</p>
                <span className="text-xs font-black text-primary mt-2 block">${product.price.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Hover Decorator */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-primary/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant border-dashed">
         <p className="text-[10px] text-on-surface-variant leading-relaxed">
           <span className="font-bold text-primary">Pro Tip:</span> Move slowly for the most accurate AR calibration. If tracking jitters, ensure you are in a well-lit area.
         </p>
      </div>
    </div>
  );
}

export { REAL_PRODUCTS };
