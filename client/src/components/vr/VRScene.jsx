import React, { useState, useEffect, Suspense } from 'react';
import { Controllers, Hands } from '@react-three/xr';
import { Environment, ContactShadows, Sky, OrbitControls, Stars, Float } from '@react-three/drei';
import Product3DCard from './Product3DCard';
import AIChatPanel from './AIChatPanel';
import LiveVideoPanel from './LiveVideoPanel';

// Dummy products for the VR gallery
const MOCK_PRODUCTS = [
  { id: 1, name: "Neural Headphones", price: 299.99, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&h=400&fit=crop" },
  { id: 2, name: "Smart Watch V5", price: 199.50, imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&h=400&fit=crop" },
  { id: 3, name: "Holographic Display", price: 899.00, imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&h=400&fit=crop" }
];

/**
 * VRScene - The core interactive 3D environment.
 * Handles lighting, floor, product placement, and assistant UI.
 */
export default function VRScene() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [assistantMode, setAssistantMode] = useState('ai'); // 'ai' or 'human'

  useEffect(() => {
    console.log("VR Scene Mounted: Ready for interaction.");
    console.log("Environment Preset: City (loading via CDN)");
    
    return () => console.log("VR Scene Unmounted.");
  }, []);

  const handleSelect = (product) => {
    console.log("Product Interactive Select:", product.name);
    setSelectedProduct(product);
  };

  return (
    <>
      {/* 1. LIGHTING SETUP (Redundant for stability) */}
      <ambientLight intensity={0.7} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={2.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-10, 5, -5]} intensity={1.5} color="#494bd6" />
      
      {/* 2. ENVIRONMENT & ATMOSPHERE */}
      <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Environment map with low-poly fallback logic */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      {/* 3. CAM CONTROLS (Desktop Mode Fallback) */}
      <OrbitControls 
        makeDefault 
        enablePan={false} 
        maxPolarAngle={Math.PI / 1.8} 
        minDistance={2} 
        maxDistance={15}
      />

      {/* 4. WEBXR INTERACTION */}
      <Controllers />
      <Hands />

      {/* 5. PHYSICAL GROUND */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1c1e" roughness={0.3} metalness={0.8} />
      </mesh>
      
      <ContactShadows 
         position={[0, 0, 0]}
         resolution={512} 
         scale={30} 
         blur={1.5} 
         opacity={0.65} 
         far={10} 
         color="#000000" 
      />

      {/* 6. PRODUCT DISPLAY (Curved layout) */}
      <group position={[0, 1.4, -4.5]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Product3DCard position={[-3.2, 0, 1.2]} rotation={[0, Math.PI / 5, 0]} product={MOCK_PRODUCTS[0]} onSelect={handleSelect} />
        </Float>
        
        <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.7}>
          <Product3DCard position={[0, 0, 0]} rotation={[0, 0, 0]} product={MOCK_PRODUCTS[1]} onSelect={handleSelect} />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Product3DCard position={[3.2, 0, 1.2]} rotation={[0, -Math.PI / 5, 0]} product={MOCK_PRODUCTS[2]} onSelect={handleSelect} />
        </Float>
      </group>

      {/* 7. VIRTUAL ASSISTANT SYSTEM */}
      <group position={[-4.5, 1.5, -1.8]} rotation={[0, Math.PI / 2.8, 0]}>
        {assistantMode === 'ai' ? (
          <AIChatPanel 
            position={[0, 0, 0]} 
            onSwitchToHuman={() => {
              console.log("Switching to LIVE Human Assistant...");
              setAssistantMode('human');
            }}
          />
        ) : (
          <group>
            <LiveVideoPanel position={[0, 0, 0]} />
            
            {/* Switch Back Button */}
            <mesh 
              position={[0, -1.2, 0.1]} 
              onClick={() => setAssistantMode('ai')}
              onPointerOver={() => (document.body.style.cursor = 'pointer')}
              onPointerOut={() => (document.body.style.cursor = 'auto')}
            >
              <planeGeometry args={[1.5, 0.4]} />
              <meshStandardMaterial color="#4648d4" opacity={0.9} transparent />
              <Text position={[0, 0, 0.02]} fontSize={0.1} color="white" fontWeight="bold">
                RETURN TO AI GENIE
              </Text>
            </mesh>
          </group>
        )}
      </group>

      {/* 8. PRODUCT HUD / INFO PANEL */}
      {selectedProduct && (
        <group position={[0, 3.2, -4]} animate={{ y: 3.2 }}>
           <mesh>
             <planeGeometry args={[2.5, 0.6]} />
             <meshStandardMaterial color="#4648d4" transparent opacity={0.7} metalness={1} roughness={0} />
           </mesh>
           <Text position={[0, 0.1, 0.05]} fontSize={0.22} color="white" fontWeight="bold">
             {selectedProduct.name}
           </Text>
           <Text position={[0, -0.15, 0.05]} fontSize={0.12} color="#c0c1ff">
             INTERACTIVE VIEWING ACTIVE
           </Text>
        </group>
      )}
    </>
  );
}
