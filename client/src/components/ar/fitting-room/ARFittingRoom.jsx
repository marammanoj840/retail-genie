import React, { useEffect, useRef, useState } from 'react';
import { Camera, Layers, Share2, Download, RotateCcw, Sparkles } from 'lucide-react';
import { PoseTrackingEngine } from './PoseTrackingEngine';
import { ClothingAttachmentEngine } from './ClothingAttachmentEngine';

/**
 * ARFittingRoom - The mirror experience component
 */
export default function ARFittingRoom() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const rendererRef = useRef(null);
  
  const [clothingList, setClothingList] = useState([]);
  const [equippedItems, setEquippedItems] = useState([]);
  const [isMirrored, setIsMirrored] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch clothing via the new backend endpoints
    const fetchData = async () => {
      try {
        const res = await fetch('/api/clothing-list');
        if (!res.ok) throw new Error("Could not fetch clothing inventory");
        const data = await res.json();
        setClothingList(data);
      } catch (err) {
        console.error("Failed to load inventory:", err);
        setError("Catalog Offline: Please ensure the server is running.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const initEngine = async () => {
      // Small delay loop to wait for MediaPipe CDN scripts to register in the global window
      let attempts = 0;
      while ((!window.Pose || !window.Camera) && attempts < 10) {
        await new Promise(r => setTimeout(r, 500));
        attempts++;
      }

      if (!window.Pose || !window.Camera) {
        setError("MediaPipe Tracking Scripts failed to load. Please check your internet connection.");
        return;
      }

      if (videoRef.current && canvasRef.current) {
        const poseEngine = new PoseTrackingEngine(videoRef.current, (results) => {
          renderFrame(results);
        });
        engineRef.current = poseEngine;
        try {
          await poseEngine.init();
        } catch (e) {
          console.error(e);
          setError("Webcam access denied or unsupported browser.");
        }

        rendererRef.current = new ClothingAttachmentEngine(
          canvasRef.current.getContext('2d'),
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    };

    if (!isLoading) {
      initEngine();
    }

    return () => {
      if (engineRef.current) engineRef.current.stop();
    };
  }, [isLoading]);

  const renderFrame = (results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (results.smoothedLandmarks) {
      rendererRef.current.renderOutfit(results.smoothedLandmarks, equippedItems);
    }
  };

  const toggleItem = (item) => {
    setEquippedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.filter(i => i.id !== item.id);
      // Remove same type if not layering (e.g., only one shirt)
      const filtered = prev.filter(i => i.type !== item.type);
      return [...filtered, item];
    });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[600px] bg-black rounded-[2.5rem] overflow-hidden shadow-heavy border-[10px] border-surface-container-high ring-1 ring-white/10">
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${isMirrored ? 'scale-x-[-1]' : ''}`}
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className={`absolute top-0 left-0 w-full h-full pointer-events-none object-cover ${isMirrored ? 'scale-x-[-1]' : ''}`}
      />

      {/* AR Controls Overlay */}
      <div className="absolute top-8 left-8 flex flex-col gap-4">
        <button 
          onClick={() => setIsMirrored(!isMirrored)}
          className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-primary transition-all group"
          title="Mirror Flip"
        >
          <RotateCcw className={`w-6 h-6 group-hover:rotate-180 transition-transform duration-500`} />
        </button>
        <button 
          className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-primary transition-all"
          title="Layering Mode"
        >
          <Layers className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
         <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar max-w-[70%]">
            {clothingList.map(item => (
              <button
                key={item.id}
                onClick={() => toggleItem(item)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold tracking-tight transition-all border ${
                  equippedItems.some(i => i.id === item.id)
                    ? 'bg-primary text-white border-primary shadow-lg'
                    : 'bg-black/60 text-white/60 border-white/10 hover:border-white/40'
                }`}
              >
                {item.name}
              </button>
            ))}
         </div>

         <button 
            className="p-6 bg-primary text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
            onClick={() => alert("Outfit Snapshot Saved!")}
         >
            <Camera className="w-8 h-8" />
         </button>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-6 z-50">
           <Sparkles className="w-12 h-12 text-primary animate-pulse" />
           <p className="text-white text-sm font-black uppercase tracking-widest">Waking up Neural Mirror...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center gap-6 z-50 p-12 text-center">
           <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/50">
              <span className="text-red-500 font-bold text-2xl">!</span>
           </div>
           <div className="space-y-2">
             <h3 className="text-white font-black text-xl tracking-tighter uppercase">Connection Failure</h3>
             <p className="text-red-200 text-sm font-medium">{error}</p>
           </div>
           <button 
             onClick={() => window.location.reload()}
             className="mt-4 px-8 py-3 bg-white text-red-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all"
           >
             Retry Connection
           </button>
        </div>
      )}
    </div>
  );
}
