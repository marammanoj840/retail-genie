import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR } from '@react-three/xr';
import { Loader, Html } from '@react-three/drei';
import VRScene from '../components/vr/VRScene';
import ErrorBoundary from '../components/common/ErrorBoundary';

/**
 * VRShop - Main entry point for Retail Genie VR.
 * 
 * Features:
 * 1. ErrorBoundary to catch scene crashes
 * 2. Suspense with fallback for assets loading
 * 3. Secure origin (HTTPS) / Browser Support detection
 * 4. Desktop fallback with mouse controls
 */
export default function VRShop() {
  const [xrSupported, setXrSupported] = useState(true);
  const [isSecure, setIsSecure] = useState(true);

  useEffect(() => {
    // Check for Secure Context (WebXR requirement)
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      setIsSecure(false);
    }

    // Check if navigator.xr is available
    if (!navigator.xr) {
      setXrSupported(false);
    } else {
      navigator.xr.isSessionSupported('immersive-vr').then(supported => {
        setXrSupported(supported);
      });
    }

    console.log("VR Initialization: Secure Origin Check:", window.isSecureContext);
  }, []);

  return (
    <ErrorBoundary>
      <div className="w-full h-screen bg-[#050505] overflow-hidden relative font-manrope">
        
        {/* Navigation / Header Overlay */}
        <div className="absolute top-8 left-8 z-40 text-white select-none pointer-events-none">
          <div className="flex items-center gap-3 mb-1">
             <span className="material-symbols-outlined text-primary-fixed text-4xl">view_in_ar</span>
             <h1 className="text-3xl font-extrabold font-headline tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
               RETAIL GENIE <span className="text-primary-fixed">VR</span>
             </h1>
          </div>
          <p className="text-sm text-slate-400 font-medium tracking-widest uppercase ml-12">
            AI-Powered Hyper-Immersive Shop
          </p>
        </div>

        {/* VR Button with status indicators */}
        <div className="absolute z-50 bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          {!isSecure && (
            <div className="bg-amber-500/20 text-amber-500 px-4 py-2 rounded-lg border border-amber-500/30 text-xs backdrop-blur-md mb-2 flex items-center gap-2 max-w-sm text-center">
              <span className="material-symbols-outlined text-sm font-bold">warning</span>
              HTTPS is recommended for a full VR headset experience.
            </div>
          )}
          
          <VRButton className="!bg-primary-fixed !text-white !px-10 !py-4 !rounded-xl !font-bold !shadow-2xl !border-0 !cursor-pointer hover:!scale-105 active:!scale-95 transition-all !text-base" />
          
          <div className="flex gap-4 items-center">
            <span className="text-white/40 text-xs flex items-center gap-1.5 bg-white/5 py-1 px-3 rounded-full border border-white/5 shadow-inner">
               <span className={`w-1.5 h-1.5 rounded-full ${xrSupported ? 'bg-green-500' : 'bg-red-500'}`} />
               {xrSupported ? 'XR Hardware Detected' : 'No Headset Found (Using Desktop Mode)'}
            </span>
          </div>
        </div>

        {/* Instructions Overlay for Desktop fallback */}
        {!xrSupported && (
          <div className="absolute bottom-8 right-8 z-40 text-white/30 text-[10px] tracking-widest uppercase flex flex-col gap-1 items-end select-none">
             <div>LEFT CLICK + DRAG TO ROTATE</div>
             <div>SCROLL TO ZOOM IN / OUT</div>
          </div>
        )}

        {/* The 3D Render Canvas */}
        <Canvas 
          shadows 
          camera={{ position: [0, 1.6, 6], fov: 50 }} 
          dpr={[1, 2]} 
          gl={{ antialias: true, stencil: false, depth: true }}
        >
          <XR>
            <Suspense fallback={
              <Html center>
                <div className="flex flex-col items-center gap-6">
                  <div className="w-16 h-16 border-4 border-primary-fixed border-t-transparent rounded-full animate-spin shadow-2xl" />
                  <div className="text-white font-bold text-xl tracking-widest text-center animate-pulse drop-shadow-lg">
                    SYNCHRONIZING VIRTUAL ENVIRONMENT...
                  </div>
                </div>
              </Html>
            }>
              <VRScene />
            </Suspense>
          </XR>
        </Canvas>

        {/* Standard Loading Bar */}
        <Loader 
          dataInterpolation={(p) => `Initializing Neural Nodes: ${p.toFixed(0)}%`}
          containerStyles={{ background: '#050505' }}
          innerStyles={{ border: 'none', background: '#333' }}
          barStyles={{ background: '#4648d4', height: '3px' }}
        />
      </div>
    </ErrorBoundary>
  );
}
