import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
            AI-Driven Personalization
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Shop Smarter <br/>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">with AI</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            Experience a curated marketplace where your personal concierge finds exactly what you need before you even ask.
          </p>
          
          {/* AI Search Bar */}
          <div className="w-full max-w-3xl relative mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center bg-white/90 backdrop-blur-md rounded-full px-6 py-4 shadow-[0_20px_40px_rgba(25,28,30,0.06)] border border-outline-variant/15">
                <span className="material-symbols-outlined text-on-surface-variant mr-4">search</span>
                <input className="flex-1 bg-transparent border-none focus:ring-0 text-lg placeholder:text-on-surface-variant/60 outline-none" placeholder="Ask Retail Genie to find your perfect style..." type="text"/>
                <Link to="/products" className="bg-gradient-to-br from-primary to-secondary text-white px-8 py-2.5 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                  Ask AI
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="text-sm text-on-surface-variant font-medium">Try:</span>
              <button className="text-xs bg-surface-container-high px-3 py-1.5 rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">Sustainable summer dresses</button>
              <button className="text-xs bg-surface-container-high px-3 py-1.5 rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">Noise-canceling headphones for travel</button>
              <button className="text-xs bg-surface-container-high px-3 py-1.5 rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">Minimalist home office desk</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="bg-surface-container-low py-20 rounded-[3.5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-2">Curated For You</h2>
              <p className="text-on-surface-variant">Top AI recommendations based on your preferences</p>
            </div>
            <div className="flex gap-2">
              <button className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          
          <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-8 snap-x">
            {/* Product Card 1 */}
            <div className="flex-none w-[320px] bg-surface-container-lowest rounded-lg p-4 group hover:shadow-[0_20px_40px_rgba(25,28,30,0.06)] transition-all snap-start">
              <div className="relative aspect-square rounded-md overflow-hidden mb-4">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Product" src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop"/>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">98% Match</div>
              </div>
              <h3 className="font-bold text-lg mb-1">Urban Premium Hoodie</h3>
              <p className="text-on-surface-variant text-sm mb-4">Space Gray • AI Rated</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">₹1499.00</span>
                <Link to="/products" className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </Link>
              </div>
            </div>
            
            {/* Product Card 2 */}
            <div className="flex-none w-[320px] bg-surface-container-lowest rounded-lg p-4 group hover:shadow-[0_20px_40px_rgba(25,28,30,0.06)] transition-all snap-start">
              <div className="relative aspect-square rounded-md overflow-hidden mb-4">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Product" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKLZigmDFY0-3FLQA5eV3FEe2USxIZAEQFAyoMcw71dqGY8ERjOAGzm3HOaxUPAQV4HYyqSs9qD-suqqVIOnI6b3Q3J58_uZZGn24V3AhvNnigUnL4JDuVFN6G6LoGvbmIb9YA1_SCUyYvuppTAYvu0wKaNMRoC1sSoDv8rgBiwNcJpvVsjAe0AWd0kFD89nbTOO505B5ED3d_JmUviw9v1JNXGMHzQuyzhAV9YLFz_9V_09wUS2SlZ32GFKmjAFJU2eyxpswR8UuT"/>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">New Arrival</div>
              </div>
              <h3 className="font-bold text-lg mb-1">Chronos Minimalist</h3>
              <p className="text-on-surface-variant text-sm mb-4">Brushed Steel • Sapphire Glass</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">₹189.00</span>
                <Link to="/products" className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid (Bento Style) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="font-headline text-3xl font-bold mb-12 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          {/* Electronics */}
          <div className="md:col-span-8 bg-surface-container-low rounded-lg p-10 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-4xl font-headline font-bold mb-4">Electronics</h3>
              <p className="max-w-xs text-on-surface-variant mb-8">Next-gen gadgets and smart home technology, picked for your ecosystem.</p>
              <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-full font-bold w-fit inline-block">Browse Gear</Link>
            </div>
            <img className="absolute -right-20 -bottom-20 w-[60%] opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none" alt="Electronics" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChCxcTKzqcLYJhgQSAwHHe-5UCvi9WoFBS6Xm07nRRnLZG0PFBXbfOdEXZyPGuKNMBBhmez2S90Z3BEB46nnyvvsGKQhuA-Uw5IsQmBPkuHQC-rDULUVPWgNkkzhHJtWwZ0QEAsESsyMLU5Q_Qxg2TfMUc6ze4vf5kEmoorvk6_rlbmyNy4UPMcwQR4fQ45nE9BOoGqjNQGN-y2S7GthrFRSRt4veFqIcSgEiBxkSpd6PjQEtujqTh5mV-NwQL60SNo4qVdx8qR04M"/>
          </div>
          
          {/* Fashion */}
          <div className="md:col-span-4 bg-secondary-fixed rounded-lg p-8 flex flex-col group overflow-hidden relative">
            <h3 className="text-3xl font-headline font-bold mb-2">Fashion</h3>
            <p className="text-on-secondary-fixed-variant mb-6 text-sm">Curated seasonal looks.</p>
            <img className="mt-auto rounded-md shadow-lg group-hover:-translate-y-4 transition-transform duration-500" alt="Fashion" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1ofJWJj_JSsWkPpek0kE33VvHTV7hp0GWWt9xkdphO4B8ykCD9ZCogKFDP9VRnn7v0CqDFL9nNy5HK8KdlT2ih7AQ7KGmXANdPlVkcRxV5J8K7gFGlcDak6_nwKRnFDfhGzM5L9-9D7UuPCExBGGlP92zq-Lku0hoxsbL4UauB8vQvr2_g5AU4Y93JKKQORRiJbJ2HNFIWLyDj0MqtYLFDFoGt1V6KOlJmx8ICy6DkbkgfPkkThkuwhxptOj-puPpaitWJfoxDXWI"/>
            <Link to="/products" className="mt-6 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">Explore Styles <span className="material-symbols-outlined">arrow_forward</span></Link>
          </div>
          
          {/* Home */}
          <div className="md:col-span-5 bg-tertiary-fixed rounded-lg p-8 flex flex-col group relative overflow-hidden">
            <h3 className="text-3xl font-headline font-bold mb-4">Home</h3>
            <p className="text-on-tertiary-fixed-variant mb-8 text-sm">Elevate your living space with AI-matched decor and furniture.</p>
            <img className="w-full aspect-video object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-500" alt="Home" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVrZwEuEAqV69l0fWa-LuP-wMtH0-MTiKnY5ezi9U7zzMccw3YRMiEHH5-jNSJ6FxY_U9h-Q7jOeuRH52FiOmZPJvAmvrCloOtenan5UD6fVgNLmtrLHhBJlAioNyWPj49hKN5-Kn67p8A6FMGXl6GWNjm32t3TWsxBf1sMVzEopI28ZiZ7OZ9-9nMANiWYJAIhhvBnRNr861lGd2Qnlpivx4sUzrviCYgrMw84bIDqbKqSoUegBuiZy5EWdU__weLzsZHN-EuGHUC"/>
          </div>
          
          {/* AI Assistant CTA */}
          <div className="md:col-span-7 bg-gradient-to-br from-primary to-secondary rounded-lg p-10 flex items-center justify-between text-white group">
            <div className="max-w-md">
              <span className="material-symbols-outlined text-5xl mb-6 opacity-80">smart_toy</span>
              <h3 className="text-4xl font-headline font-extrabold mb-4">Can't decide?</h3>
              <p className="text-indigo-50 mb-8 opacity-90">Let our AI Genie analyze your taste and recommend the best products for your lifestyle.</p>
              <div className="flex gap-4">
                <Link to="/products" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform inline-block">Start Chat</Link>
                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-surface-container-lowest rounded-xl p-12 md:p-20 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-outline-variant/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-6">Ready to upgrade your shopping?</h2>
          <p className="text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto">Join over 1 million shoppers using Retail Genie to save time and discover products they truly love.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-gradient-to-br from-primary to-secondary text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">Explore</Link>
            <Link to="/products" className="bg-surface-container-high text-on-surface px-10 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all">Start Shopping</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
