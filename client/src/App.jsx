import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotUI from './components/ChatbotUI';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import './App.css';

const TryOn = React.lazy(() => import('./pages/TryOnPage'));

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';
  
  const hideChrome = isAuthPage;

  return (
    <div className={`min-h-screen flex flex-col w-full relative ${hideChrome ? 'bg-surface' : ''}`}>
      {!hideChrome && <Navbar />}
      <main className={`flex-grow w-full ${hideChrome ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:mb-10 mb-20'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/try-on" element={
            <Suspense fallback={<div className="p-20 text-center font-bold animate-pulse">Loading AR Engine...</div>}>
              <TryOn />
            </Suspense>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
      {!hideChrome && <ChatbotUI />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
