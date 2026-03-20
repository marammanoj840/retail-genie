import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const PC_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};

export function useWebRTC(roomId) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Setup Socket - Use current hostname to allow headset/mobile connectivity
    const socketUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000' 
      : `http://${window.location.hostname}:5000`;
      
    socketRef.current = io(socketUrl);
    
    // 2. Setup Peer Connection
    peerConnectionRef.current = new RTCPeerConnection(PC_CONFIG);

    peerConnectionRef.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('ice-candidate', {
          candidate: event.candidate,
          to: roomId // In a real app, map user socket to IDs
        });
      }
    };

    // 3. Socket event handlers
    socketRef.current.on('connect', () => {
      setIsConnected(true);
      socketRef.current.emit('join-room', roomId);
    });

    socketRef.current.on('user-connected', async (userId) => {
      // Create offer when another user joins
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socketRef.current.emit('offer', { offer, to: userId });
    });

    socketRef.current.on('offer', async (data) => {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socketRef.current.emit('answer', { answer, to: data.from });
    });

    socketRef.current.on('answer', async (data) => {
      if (!peerConnectionRef.current.currentRemoteDescription) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

    socketRef.current.on('ice-candidate', async (data) => {
      try {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (e) {
        console.error('Error adding received ice candidate', e);
      }
    });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      peerConnectionRef.current?.close();
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      stream.getTracks().forEach(track => {
        if (peerConnectionRef.current) {
          peerConnectionRef.current.addTrack(track, stream);
        }
      });
    } catch (err) {
      console.error('Failed to get local stream', err);
    }
  };

  const toggleAudio = (enabled) => {
    if (localStream) {
      localStream.getAudioTracks().forEach(t => t.enabled = enabled);
    }
  };

  return { localStream, remoteStream, isConnected, startVideo, toggleAudio };
}
