import React, { useState } from 'react';
import { Html, Text, RoundedBox } from '@react-three/drei';
import { Interactive } from '@react-three/xr';

export default function AIChatPanel({ position, rotation, onSwitchToHuman }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <group position={position} rotation={rotation}>
      <Interactive onSelect={() => setIsOpen(!isOpen)}>
        <group position={[0, 2, 0]}>
          <RoundedBox args={[0.6, 0.6, 0.05]} radius={0.1}>
            <meshPhysicalMaterial 
              color="#4648d4" 
              transmission={0.5} 
              opacity={0.8} 
              transparent 
              roughness={0} 
            />
          </RoundedBox>
          <Text position={[0, 0, 0.03]} fontSize={0.15} color="white" fontWeight="bold">
            AI Genie
          </Text>
        </group>
      </Interactive>

      {isOpen && (
        <Html position={[0, 1, 0]} transform occlude distanceFactor={1.5}>
          <div className="w-80 h-96 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 flex flex-col p-4 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
              <span className="material-symbols-outlined text-primary">smart_toy</span>
              <h3 className="font-bold text-lg text-slate-800 font-headline"> Genie Vision</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              <div className="bg-primary/10 p-3 rounded-lg text-sm text-slate-800">
                Welcome to the VR Gallery! Look around and pick up items. What are you looking for today?
              </div>
              <div className="bg-slate-100 p-3 rounded-lg text-sm text-slate-800 ml-auto w-3/4">
                I need some smart home devices.
              </div>
              <div className="bg-primary/10 p-3 rounded-lg text-sm text-slate-800">
                Check out the left wing! I've highlighted the latest smart speakers and lighting for you.
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <input type="text" placeholder="Speak or type..." className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-primary" />
                <button className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-sm">mic</span>
                </button>
              </div>
              <button 
                onClick={onSwitchToHuman}
                className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined text-sm">person</span>
                CALL HUMAN ASSISTANT
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
