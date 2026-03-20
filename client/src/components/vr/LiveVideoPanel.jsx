import React, { useEffect, useRef, useState } from 'react';
import { Html, RoundedBox, Text } from '@react-three/drei';
import { Interactive } from '@react-three/xr';
import { useWebRTC } from '../../hooks/useWebRTC';

export default function LiveVideoPanel({ position, rotation, isAssistant = false }) {
  const { remoteStream, localStream, startVideo, toggleAudio, isConnected } = useWebRTC('retail-genie-vr-room');
  const remoteVideoRef = useRef();
  const localVideoRef = useRef();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const handleStartCall = () => {
    setIsCalling(true);
    startVideo();
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toggleAudio(isMuted); // if it was muted, we pass true to enable
  };

  return (
    <group position={position} rotation={rotation}>
      {/* 3D Frame */}
      <RoundedBox args={[1.8, 1.2, 0.05]} radius={0.05}>
        <meshStandardMaterial color="#2d3133" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* HTML Video Elements mapped onto 3D via Html component */}
      <Html transform position={[0, 0, 0.03]} distanceFactor={1.5} occlude>
        <div className="w-[800px] h-[520px] bg-slate-900 rounded-3xl overflow-hidden flex flex-col shadow-2xl border-4 border-slate-700 relative">
          
          {/* Header */}
          <div className="bg-slate-800/80 backdrop-blur px-6 py-4 flex justify-between items-center absolute top-0 w-full z-10">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-white font-bold text-xl tracking-wider">
                {isAssistant ? "Store Dashboard" : "Live Human Assistant"}
              </span>
            </div>
            {isCalling && (
              <div className="bg-primary/20 text-primary-fixed border border-primary/30 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">schedule</span> 01:24
              </div>
            )}
          </div>

          {/* Main Video Area */}
          <div className="flex-1 bg-black relative flex items-center justify-center">
            {remoteStream ? (
              <video 
                ref={remoteVideoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="text-white/40 flex flex-col items-center">
                <span className="material-symbols-outlined text-6xl mb-4 opacity-50">videocam_off</span>
                <p className="text-xl font-medium">Waiting for assistant to join...</p>
              </div>
            )}

            {/* PIP Local Video */}
            {localStream && (
              <div className="absolute bottom-6 right-6 w-48 h-32 bg-slate-800 rounded-xl overflow-hidden shadow-xl border-2 border-slate-600">
                <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="bg-slate-800/90 backdrop-blur px-8 py-5 flex justify-center gap-6 absolute bottom-0 w-full z-10">
            {!isCalling ? (
              <button 
                onClick={handleStartCall}
                className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-transform hover:scale-105"
              >
                <span className="material-symbols-outlined">call</span> Connect to Assistant
              </button>
            ) : (
              <>
                <button 
                  onClick={handleToggleMute}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 ${isMuted ? 'bg-red-500' : 'bg-slate-600 hover:bg-slate-500'}`}
                >
                  <span className="material-symbols-outlined">{isMuted ? 'mic_off' : 'mic'}</span>
                </button>
                <button className="w-14 h-14 rounded-full bg-slate-600 hover:bg-slate-500 flex items-center justify-center text-white transition-transform hover:scale-105">
                  <span className="material-symbols-outlined">videocam</span>
                </button>
                <button className="bg-red-500 hover:bg-red-400 text-white px-8 py-3 w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105">
                  <span className="material-symbols-outlined">call_end</span>
                </button>
              </>
            )}
          </div>

        </div>
      </Html>
    </group>
  );
}
