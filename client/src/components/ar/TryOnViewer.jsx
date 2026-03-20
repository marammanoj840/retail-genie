import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Sparkles, Camera, Loader2, AlertCircle, Info } from 'lucide-react';

/**
 * TryOnViewer - Universal AR Product Placement Engine
 * 
 * Tracks Face (for glasses/hats) and Body (for clothing) using MediaPipe 
 * FaceMesh and Pose models simultaneously.
 */
export default function TryOnViewer({ selectedProduct }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState(null);
  
  // Storage for latest tracking results
  const latestResults = useRef({ face: null, pose: null });

  useEffect(() => {
    let faceMesh = null;
    let pose = null;
    let camera = null;
    let isMounted = true;

    const initAR = async () => {
      try {
        if (!window.FaceMesh || !window.Pose || !window.Camera) {
          setError("AR Engine components (Pose/Face) not found. Please refresh.");
          return;
        }

        // --- 1. FACE MESH SETUP ---
        faceMesh = new window.FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });
        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        faceMesh.onResults((results) => {
          latestResults.current.face = results;
          requestUpdate();
        });

        // --- 2. POSE (BODY) SETUP ---
        pose = new window.Pose({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });
        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        pose.onResults((results) => {
          latestResults.current.pose = results;
          requestUpdate();
        });

        // --- 3. CAMERA SYNC ---
        if (webcamRef.current && webcamRef.current.video) {
          camera = new window.Camera(webcamRef.current.video, {
            onFrame: async () => {
              if (webcamRef.current?.video) {
                const video = webcamRef.current.video;
                // Only send to relevant engine to save CPU
                if (selectedProduct.type === 'body') {
                   await pose.send({ image: video });
                } else {
                   await faceMesh.send({ image: video });
                }
              }
            },
            width: 1280,
            height: 720,
          });
          camera.start();
        }
      } catch (err) {
        console.error("Universal AR Init Error:", err);
        setError("Failed to initialize multi-mode tracking.");
      }
    };

    initAR();

    return () => {
      isMounted = false;
      if (camera) camera.stop();
      if (faceMesh) faceMesh.close();
      if (pose) pose.close();
    };
  }, [selectedProduct.type]); // Restart camera loop if type changes

  /**
   * Render Dispatcher
   */
  const requestUpdate = () => {
    if (canvasRef.current) {
      renderAll();
    }
  };

  const renderAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    setIsInitializing(false);

    const productImg = new Image();
    productImg.src = selectedProduct.url;
    if (!productImg.complete) return;

    ctx.save();
    ctx.globalAlpha = 0.95;

    // --- CASE A: FACE/HEAD OVERLAY (Using Face Mesh) ---
    if ((selectedProduct.type === 'face' || selectedProduct.type === 'head') && latestResults.current.face?.multiFaceLandmarks?.[0]) {
      const landmarks = latestResults.current.face.multiFaceLandmarks[0];
      const bridge = landmarks[168];
      const lEye = landmarks[33];
      const rEye = landmarks[263];
      const forehead = landmarks[10];

      const dx = (rEye.x - lEye.x) * width;
      const dy = (rEye.y - lEye.y) * height;
      const eyeDist = Math.sqrt(dx * dx + dy * dy);
      const rotation = Math.atan2(dy, dx);

      // --- REALISM ENHANCEMENTS: Soft Shadows & Blending ---
      ctx.save();
      ctx.globalAlpha = 0.98; 
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 10;

      if (selectedProduct.type === 'face') {
        const overlayW = eyeDist * 2.3; 
        const overlayH = overlayW * (productImg.height / productImg.width);
        ctx.translate(bridge.x * width, bridge.y * height);
        ctx.rotate(rotation);
        ctx.drawImage(productImg, -overlayW / 2, -overlayH / 2, overlayW, overlayH);
      } 
      else if (selectedProduct.type === 'head') {
        const overlayW = eyeDist * 4.2; 
        const overlayH = overlayW * (productImg.height / productImg.width);
        ctx.translate(forehead.x * width, forehead.y * height);
        ctx.rotate(rotation);
        ctx.drawImage(productImg, -overlayW / 2, -overlayH * 0.75, overlayW, overlayH);
      }
      ctx.restore();
    }

    // --- CASE B: BODY OVERLAY (Clothing using Pose) ---
    if (selectedProduct.type === 'body' && latestResults.current.pose?.poseLandmarks) {
      const landmarks = latestResults.current.pose.poseLandmarks;
      const lSh = landmarks[11];
      const rSh = landmarks[12];
      
      const sDx = (rSh.x - lSh.x) * width;
      const sDy = (rSh.y - lSh.y) * height;
      const sDist = Math.sqrt(sDx * sDx + sDy * sDy);
      const bRotation = Math.atan2(sDy, sDx);

      const mX = ((lSh.x + rSh.x) / 2) * width;
      const mY = ((lSh.y + rSh.y) / 2) * height;

      ctx.save();
      ctx.globalAlpha = 0.95;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 20;

      const overlayW = sDist * 2.8; 
      const overlayH = overlayW * (productImg.height / productImg.width);
      
      ctx.translate(mX, mY + (overlayH * 0.35)); 
      ctx.rotate(bRotation);
      ctx.drawImage(productImg, -overlayW / 2, -overlayH / 2, overlayW, overlayH);
      ctx.restore();
    }

    ctx.restore();
  };

  return (
    <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-black border-[12px] border-surface-container-highest shadow-2xl group">
      <Webcam
        ref={webcamRef}
        mirrored={true}
        className="w-full h-full object-cover"
        videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
      />
      <canvas ref={canvasRef} width={1280} height={720} className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />

      {isInitializing && !error && (
        <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center p-8 text-center gap-6 backdrop-blur-md">
           <Loader2 className="w-16 h-16 text-primary animate-spin" />
           <div className="space-y-2">
             <h2 className="text-white text-xl font-bold tracking-widest uppercase">Initializing Universal AR</h2>
             <p className="text-white/40 text-sm">Loading Neural Networks for {selectedProduct.type.toUpperCase()} tracking...</p>
           </div>
        </div>
      )}

      {error && (
         <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center p-12 text-center gap-6 backdrop-blur-md">
           <AlertCircle className="w-12 h-12 text-red-400" />
           <p className="text-white font-bold">{error}</p>
         </div>
      )}

      <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
         <div className="bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              {selectedProduct.type === 'body' ? 'Pose Detect Active' : 'Face Mesh Active'}
            </span>
         </div>
      </div>
    </div>
  );
}
