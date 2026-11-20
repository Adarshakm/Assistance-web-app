/**
 * WebRTC Voice and Video Call Service
 * Handles P2P media streams, STUN negotiation, and REST signaling
 */

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' },
];

/**
 * Audio Synthesizer for Phone Ringtones, Incoming Melody, and Chimes
 */
export const callAudioSynthesizer = {
  // Outgoing phone ringing tone (440Hz + 480Hz dual tone cadence)
  playOutgoingRing: () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return { stop: () => {} };
      const ctx = new AudioCtx();
      let isPlaying = true;
      let osc1 = null;
      let osc2 = null;
      let gainNode = null;
      let ringTimeout = null;

      const triggerCycle = () => {
        if (!isPlaying || ctx.state === 'closed') return;

        try {
          osc1 = ctx.createOscillator();
          osc2 = ctx.createOscillator();
          gainNode = ctx.createGain();

          osc1.type = 'sine';
          osc2.type = 'sine';
          osc1.frequency.setValueAtTime(440, ctx.currentTime);
          osc2.frequency.setValueAtTime(480, ctx.currentTime);

          gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
          gainNode.gain.setValueAtTime(0.08, ctx.currentTime + 1.4);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

          osc1.connect(gainNode);
          osc2.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc1.start(ctx.currentTime);
          osc2.start(ctx.currentTime);
          osc1.stop(ctx.currentTime + 1.5);
          osc2.stop(ctx.currentTime + 1.5);

          ringTimeout = setTimeout(() => {
            if (isPlaying) triggerCycle();
          }, 3500);
        } catch {
          // ignore
        }
      };

      triggerCycle();

      return {
        stop: () => {
          isPlaying = false;
          if (ringTimeout) clearTimeout(ringTimeout);
          try {
            if (osc1) osc1.stop();
            if (osc2) osc2.stop();
            ctx.close();
          } catch {}
        },
      };
    } catch {
      return { stop: () => {} };
    }
  },

  // Incoming call ringtone melody
  playIncomingRing: () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return { stop: () => {} };
      const ctx = new AudioCtx();
      let isPlaying = true;
      let loopTimer = null;

      const notes = [
        { f: 523.25, d: 0.15 },
        { f: 659.25, d: 0.15 },
        { f: 783.99, d: 0.15 },
        { f: 1046.5, d: 0.25 },
        { f: 783.99, d: 0.15 },
        { f: 1046.5, d: 0.4 },
      ];

      const playMelody = () => {
        if (!isPlaying || ctx.state === 'closed') return;
        try {
          let time = ctx.currentTime;
          notes.forEach((note) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.f, time);

            gain.gain.setValueAtTime(0.001, time);
            gain.gain.exponentialRampToValueAtTime(0.12, time + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(time);
            osc.stop(time + note.d);
            time += note.d + 0.05;
          });

          loopTimer = setTimeout(() => {
            if (isPlaying) playMelody();
          }, 2400);
        } catch {}
      };

      playMelody();

      return {
        stop: () => {
          isPlaying = false;
          if (loopTimer) clearTimeout(loopTimer);
          try {
            ctx.close();
          } catch {}
        },
      };
    } catch {
      return { stop: () => {} };
    }
  },

  // Call connected pleasant chime
  playConnectedChime: () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Note 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.2);

      // Note 2
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.15); // A5
      gain2.gain.setValueAtTime(0.1, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.45);

      setTimeout(() => {
        try {
          ctx.close();
        } catch {}
      }, 500);
    } catch {}
  },

  // Call ended / busy tone
  playEndedChime: () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      let time = ctx.currentTime;

      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(425, time);
        gain.gain.setValueAtTime(0.1, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.18);
        time += 0.25;
      }

      setTimeout(() => {
        try {
          ctx.close();
        } catch {}
      }, 900);
    } catch {}
  },
};

/**
 * WebRTC Call Manager
 * Orchestrates WebRTC peer connection, mic/camera capture, and backend REST signaling
 */
export class WebRTCCallManager {
  constructor() {
    this.callId = null;
    this.user = null;
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
    this.audioElement = null;
    this.type = 'voice'; // 'voice' | 'video'
    this.isMuted = false;
    this.isVideoOff = false;
    this.role = null; // 'caller' | 'recipient'
    this.pollInterval = null;
    this.ringSound = null;
    this.audioContext = null;
    this.analyser = null;
    this.levelInterval = null;
    this.processedCandidateCount = 0;
    this.onStatusChange = null;
    this.onAudioLevel = null;
    this.onLocalStream = null;
    this.onRemoteStream = null;
    this.onRemoteMediaState = null;
    this.hasRemoteDescription = false;
    this.pendingCandidates = [];
    this.videoDevices = [];
    this.currentVideoDeviceIndex = 0;
  }

  /**
   * Request local audio (and video if type === 'video')
   */
  async initLocalMedia(type = 'voice') {
    this.type = type;

    const audioConstraints = {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    };

    let stream = null;

    if (type === 'video') {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: audioConstraints,
          video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
            facingMode: 'user',
          },
        });
        this.isVideoOff = false;
      } catch (videoErr) {
        console.warn('[WebRTC] Camera unavailable or permission denied, falling back to audio only:', videoErr);
        // Fallback to audio only
        stream = await navigator.mediaDevices.getUserMedia({
          audio: audioConstraints,
          video: false,
        });
        this.isVideoOff = true;
      }
    } else {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints,
        video: false,
      });
      this.isVideoOff = true;
    }

    this.localStream = stream;

    // Enumerate video devices for camera switching
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.videoDevices = devices.filter((d) => d.kind === 'videoinput');
    } catch {}

    // Setup Web Audio Analyser for live equalizer/waveform
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
        const source = this.audioContext.createMediaStreamSource(stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 64;
        source.connect(this.analyser);
      }
    } catch (err) {
      console.warn('[WebAudio] Analyser setup error:', err);
    }

    if (this.onLocalStream) {
      this.onLocalStream(stream);
    }

    return stream;
  }

  /**
   * Monitor audio levels and trigger callback for visualizer
   */
  startLevelMonitoring() {
    if (!this.analyser || !this.onAudioLevel) return;
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    this.levelInterval = setInterval(() => {
      if (this.analyser && this.onAudioLevel) {
        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const level = Math.min(100, Math.round((avg / 255) * 100));
        this.onAudioLevel(this.isMuted ? 0 : level);
      }
    }, 100);
  }

  /**
   * Setup or retrieve remote audio playback element
   */
  getOrCreateAudioElement() {
    let el = document.getElementById('planet-remote-voice-audio') || document.getElementById('assistance-remote-voice-audio');
    if (!el) {
      el = document.createElement('audio');
      el.id = 'planet-remote-voice-audio';
      el.autoplay = true;
      el.playsInline = true;
      el.style.display = 'none';
      document.body.appendChild(el);
    }
    this.audioElement = el;
    return el;
  }

  /**
   * Create RTCPeerConnection instance with event handlers
   */
  createPeerConnection() {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    // Add local tracks to peer connection
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        pc.addTrack(track, this.localStream);
      });
    }

    // Handle remote media streams
    pc.ontrack = (event) => {
      console.log('[WebRTC] Received remote track:', event.track.kind);
      this.remoteStream = event.streams[0];

      // Play audio through audio element
      const audioEl = this.getOrCreateAudioElement();
      audioEl.srcObject = event.streams[0];
      audioEl.play().catch(() => {});

      if (this.onRemoteStream) {
        this.onRemoteStream(this.remoteStream);
      }
    };

    // Forward local ICE candidates to backend
    pc.onicecandidate = (event) => {
      if (event.candidate && this.callId) {
        this.sendIceCandidate(event.candidate);
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log('[WebRTC] ICE Connection State:', pc.iceConnectionState);
      if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed') {
        console.warn('[WebRTC] Peer connection disconnected or failed');
      }
    };

    this.peerConnection = pc;
    return pc;
  }

  /**
   * Send ICE candidate to signaling backend
   */
  async sendIceCandidate(candidate) {
    if (!this.callId || !this.user) return;
    try {
      await fetch('/api/call/candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callId: this.callId,
          user: this.user,
          candidate: candidate.toJSON ? candidate.toJSON() : candidate,
        }),
      });
    } catch (err) {
      console.warn('[WebRTC] Candidate send error:', err.message);
    }
  }

  /**
   * Initiate an Outgoing Voice or Video Call
   */
  async initiateCall({
    caller,
    callerName,
    callerAvatar,
    recipient,
    recipientName,
    recipientAvatar,
    type = 'voice',
    onLocalStream,
    onRemoteStream,
    onStatusChange,
    onAudioLevel,
    onRemoteMediaState,
  }) {
    this.cleanup();
    this.role = 'caller';
    this.user = caller;
    this.type = type;
    this.onLocalStream = onLocalStream;
    this.onRemoteStream = onRemoteStream;
    this.onStatusChange = onStatusChange;
    this.onAudioLevel = onAudioLevel;
    this.onRemoteMediaState = onRemoteMediaState;

    try {
      // 1. Get mic and camera stream
      await this.initLocalMedia(type);
      this.startLevelMonitoring();

      // 2. Create peer connection
      const pc = this.createPeerConnection();

      // 3. Create WebRTC offer
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: type === 'video',
      });
      await pc.setLocalDescription(offer);

      // 4. Send call offer to backend
      const res = await fetch('/api/call/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caller,
          callerName,
          callerAvatar,
          recipient,
          recipientName,
          recipientAvatar,
          type,
          sdpOffer: offer,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate call');
      }

      this.callId = data.callId;

      // 5. Start outgoing ringtone
      this.ringSound = callAudioSynthesizer.playOutgoingRing();

      // 6. Start polling for recipient answer and candidates
      this.startPolling();

      return { success: true, callId: this.callId };
    } catch (err) {
      this.cleanup();
      throw err;
    }
  }

  /**
   * Answer an Incoming Voice or Video Call
   */
  async answerCall({
    callId,
    user,
    sdpOffer,
    type = 'voice',
    onLocalStream,
    onRemoteStream,
    onStatusChange,
    onAudioLevel,
    onRemoteMediaState,
  }) {
    this.cleanup();
    this.role = 'recipient';
    this.user = user;
    this.callId = callId;
    this.type = type;
    this.onLocalStream = onLocalStream;
    this.onRemoteStream = onRemoteStream;
    this.onStatusChange = onStatusChange;
    this.onAudioLevel = onAudioLevel;
    this.onRemoteMediaState = onRemoteMediaState;

    try {
      // 1. Get mic and camera stream
      await this.initLocalMedia(type);
      this.startLevelMonitoring();

      // 2. Create peer connection
      const pc = this.createPeerConnection();

      // 3. Set remote description (caller's offer)
      if (sdpOffer) {
        await pc.setRemoteDescription(new RTCSessionDescription(sdpOffer));
        this.hasRemoteDescription = true;
      }

      // 4. Create WebRTC answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // 5. Send answer to backend
      const res = await fetch('/api/call/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callId,
          user,
          sdpAnswer: answer,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to answer call');
      }

      // 6. Play connected chime & notify connected
      callAudioSynthesizer.playConnectedChime();
      if (this.onStatusChange) {
        this.onStatusChange('connected');
      }

      // 7. Start polling for candidates and call end
      this.startPolling();

      return { success: true };
    } catch (err) {
      this.cleanup();
      throw err;
    }
  }

  /**
   * Polling loop to sync call state, ICE candidates, and remote media toggles
   */
  startPolling() {
    if (this.pollInterval) clearInterval(this.pollInterval);

    this.pollInterval = setInterval(async () => {
      if (!this.callId) return;

      try {
        const res = await fetch(`/api/call/poll/${this.callId}?user=${encodeURIComponent(this.user || '')}`);
        if (!res.ok) {
          if (res.status === 404) {
            this.handleCallTerminated('ended');
          }
          return;
        }

        const data = await res.json();

        // 1. If caller, check if recipient answered with sdpAnswer
        if (this.role === 'caller' && data.status === 'connected' && data.sdpAnswer && !this.hasRemoteDescription) {
          try {
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdpAnswer));
            this.hasRemoteDescription = true;
            if (this.ringSound) {
              this.ringSound.stop();
              this.ringSound = null;
            }
            callAudioSynthesizer.playConnectedChime();
            if (this.onStatusChange) {
              this.onStatusChange('connected');
            }

            // Apply any pending candidates
            while (this.pendingCandidates.length > 0) {
              const cand = this.pendingCandidates.shift();
              await this.peerConnection.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
            }
          } catch (err) {
            console.warn('[WebRTC] Set remote description error:', err);
          }
        }

        // 2. Add remote ICE candidates
        if (Array.isArray(data.candidates) && data.candidates.length > this.processedCandidateCount) {
          const newCandidates = data.candidates.slice(this.processedCandidateCount);
          this.processedCandidateCount = data.candidates.length;

          for (const cand of newCandidates) {
            if (this.hasRemoteDescription && this.peerConnection) {
              try {
                await this.peerConnection.addIceCandidate(new RTCIceCandidate(cand));
              } catch (err) {
                console.warn('[WebRTC] Add candidate error:', err);
              }
            } else {
              this.pendingCandidates.push(cand);
            }
          }
        }

        // 3. Notify remote media state change (video off / muted)
        if (this.onRemoteMediaState && (typeof data.remoteVideoOff === 'boolean' || typeof data.remoteMuted === 'boolean')) {
          this.onRemoteMediaState({
            remoteVideoOff: !!data.remoteVideoOff,
            remoteMuted: !!data.remoteMuted,
          });
        }

        // 4. Handle call status transitions (rejected, ended, missed)
        if (data.status === 'rejected') {
          this.handleCallTerminated('rejected');
        } else if (data.status === 'ended' || data.status === 'missed') {
          this.handleCallTerminated(data.status);
        }
      } catch (err) {
        console.warn('[WebRTC] Signaling poll error:', err.message);
      }
    }, 1200);
  }

  /**
   * Handle call termination detected from backend
   */
  handleCallTerminated(status = 'ended') {
    if (this.ringSound) {
      this.ringSound.stop();
      this.ringSound = null;
    }
    callAudioSynthesizer.playEndedChime();
    const finalStatus = status;
    const callback = this.onStatusChange;
    this.cleanup();
    if (callback) {
      callback(finalStatus);
    }
  }

  /**
   * Reject / decline incoming call
   */
  async rejectCall({ callId, user }) {
    if (this.ringSound) {
      this.ringSound.stop();
      this.ringSound = null;
    }
    try {
      await fetch('/api/call/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId, user }),
      });
    } catch {}
    this.cleanup();
  }

  /**
   * End ongoing call
   */
  async endCall({ callId, user, duration = 0 }) {
    const targetId = callId || this.callId;
    const targetUser = user || this.user;

    if (this.ringSound) {
      this.ringSound.stop();
      this.ringSound = null;
    }
    callAudioSynthesizer.playEndedChime();

    if (targetId) {
      try {
        await fetch('/api/call/end', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            callId: targetId,
            user: targetUser,
            duration,
          }),
        });
      } catch (err) {
        console.warn('[Call End] Request failed:', err);
      }
    }

    this.cleanup();
  }

  /**
   * Toggle microphone mute
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach((track) => {
        track.enabled = !this.isMuted;
      });
    }
    this.broadcastMediaState();
    return this.isMuted;
  }

  /**
   * Toggle video camera track on/off
   */
  toggleVideo() {
    this.isVideoOff = !this.isVideoOff;
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach((track) => {
        track.enabled = !this.isVideoOff;
      });
    }
    this.broadcastMediaState();
    return this.isVideoOff;
  }

  /**
   * Broadcast mute or camera toggle state to peer via backend
   */
  async broadcastMediaState() {
    if (!this.callId || !this.user) return;
    try {
      await fetch('/api/call/media-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callId: this.callId,
          user: this.user,
          isMuted: this.isMuted,
          isVideoOff: this.isVideoOff,
        }),
      });
    } catch {}
  }

  /**
   * Switch between available cameras (e.g. front/back on mobile)
   */
  async switchCamera() {
    if (!this.localStream || this.videoDevices.length < 2) return false;

    this.currentVideoDeviceIndex = (this.currentVideoDeviceIndex + 1) % this.videoDevices.length;
    const nextDevice = this.videoDevices[this.currentVideoDeviceIndex];

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: nextDevice.deviceId } },
      });
      const newVideoTrack = newStream.getVideoTracks()[0];

      // Replace track on peer connection
      if (this.peerConnection) {
        const senders = this.peerConnection.getSenders();
        const videoSender = senders.find((s) => s.track && s.track.kind === 'video');
        if (videoSender) {
          await videoSender.replaceTrack(newVideoTrack);
        }
      }

      // Stop old video track
      const oldTrack = this.localStream.getVideoTracks()[0];
      if (oldTrack) oldTrack.stop();

      this.localStream.removeTrack(oldTrack);
      this.localStream.addTrack(newVideoTrack);

      if (this.onLocalStream) {
        this.onLocalStream(this.localStream);
      }

      return true;
    } catch (err) {
      console.warn('[WebRTC] Switch camera error:', err);
      return false;
    }
  }

  /**
   * Check incoming call status via REST API
   */
  static async checkIncomingCall(user) {
    if (!user) return { hasIncoming: false };
    try {
      const res = await fetch(`/api/call/incoming?user=${encodeURIComponent(user)}&_t=${Date.now()}`);
      if (!res.ok) return { hasIncoming: false };
      return await res.json();
    } catch {
      return { hasIncoming: false };
    }
  }

  /**
   * Fetch call history
   */
  static async getCallHistory(user) {
    if (!user) return [];
    try {
      const res = await fetch(`/api/call/history?user=${encodeURIComponent(user)}`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.calls || [];
    } catch {
      return [];
    }
  }

  /**
   * Full cleanup of media, peer connection, audio elements, and timers
   */
  cleanup() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    if (this.levelInterval) {
      clearInterval(this.levelInterval);
      this.levelInterval = null;
    }
    if (this.ringSound) {
      try {
        this.ringSound.stop();
      } catch {}
      this.ringSound = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch {}
      });
      this.localStream = null;
    }
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch {}
      this.audioContext = null;
    }
    if (this.peerConnection) {
      try {
        this.peerConnection.close();
      } catch {}
      this.peerConnection = null;
    }
    if (this.audioElement) {
      try {
        this.audioElement.srcObject = null;
      } catch {}
    }

    this.callId = null;
    this.role = null;
    this.isMuted = false;
    this.isVideoOff = false;
    this.hasRemoteDescription = false;
    this.pendingCandidates = [];
    this.processedCandidateCount = 0;
  }
}

// Export singleton instances
export const webrtcCallService = new WebRTCCallManager();
export const voiceCallService = webrtcCallService;
export default webrtcCallService;
