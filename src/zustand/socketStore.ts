import { io, Socket } from "socket.io-client";
import {
  OnGoingCall,
  Participants,
  PeerData,
  ReceivingUser,
} from "../../types/SocketTypes";
import { User } from "../../types/User";
import { create } from "zustand";
import { userDetailsStore } from "./userAuth";
import Peer, { SignalData } from "simple-peer";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

interface iSocketState {
  socket: Socket | null;
  isSocketConnected: boolean;
  initializeSocket: () => void;
  disconnectSocket: () => void;
  ongoingCall: OnGoingCall | null;
  localStream: MediaStream | null;
  peer: PeerData | null;

  handleCall: (receiverUser: User) => void;

  handleIncomingCall: (participants: Participants) => void;

  handleJoinCall: (ongoingCall: OnGoingCall) => void;

  getMediaStream: (faceMode?: string) => Promise<MediaStream | null>;

  createPeer: (stream: MediaStream, initiator: boolean) => Peer.Instance;
  handleHangupDuringInitiation: () => void;
  handleCallCancelled: (message: string) => void;
  cleanupMediaStream: () => void;

  handleHangup: () => void;

  completePeerConnection: (data: {
    sdp: SignalData;
    ongoingCall: OnGoingCall;
    isCaller: boolean;
  }) => void;
}

export const useSocketStore = create<iSocketState>((set, get) => ({
  socket: null,
  isSocketConnected: false,
  ongoingCall: null,
  localStream: null,
  peer: null,

  getMediaStream: async (faceMode) => {
    const localStream = get().localStream;
    if (localStream) {
      return localStream;
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 360, ideal: 720, max: 1080 },
          frameRate: { min: 16, ideal: 30, max: 30 },
          facingMode: videoDevices.length > 0 ? faceMode : undefined,
        },
      });
      set({
        localStream: stream,
      });
      return stream;
    } catch (error) {
      console.log("Failed to get the stream", error);
      set({ localStream: null });
      return null;
    }
  },

  handleCall: async (receiverUser) => {
    console.log("initialing call");
    const callerUser = userDetailsStore.getState().user;
    console.log(callerUser, "callerUser");
    const socket = userDetailsStore.getState().socket;
    console.log(socket, "this is socket");
    if (!callerUser || !socket) return;
    const stream = await get().getMediaStream();
    console.log(stream, "This is stream");
    if (!stream) {
      console.log("No stream in handle call");
      return;
    }

    const participants = { caller: callerUser, receiver: receiverUser };
    set({
      ongoingCall: {
        participants,
        isRinging: false,
      },
    });
    console.log(participants, "emit call");
    socket.emit("call", participants);
  },

  handleIncomingCall: (participants) => {
    console.log("handle incoming call");
    set({
      ongoingCall: {
        participants,
        isRinging: true,
      },
    });
  },

  cleanupMediaStream: () => {
    const { localStream } = get();
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    set({ localStream: null });
  },

  handleHangupDuringInitiation: () => {
    const { socket, ongoingCall } = get();
    if (socket && ongoingCall) {
      socket.emit("hangupDuringInitiation", ongoingCall);
    }
    get().cleanupMediaStream();
    set({ ongoingCall: null });
  },

  handleCallCancelled: (message: string) => {
    console.log("Call cancelled:", message);
    get().cleanupMediaStream();
    set({
      ongoingCall: null,
      localStream: null,
    });
  },

  handleHangup: () => {
    const { socket, peer, localStream, ongoingCall } = get();
    if (peer && peer.peerConnection) {
      peer.peerConnection.destroy();
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (socket && ongoingCall) {
      socket.emit("hangup", ongoingCall);
    }
    set({
      ongoingCall: null,
      localStream: null,
      peer: null,
    });
  },

  createPeer: (stream, initiator) => {
    const iceServers: RTCIceServer[] = [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
        ],
      },
    ];

    const peer = new Peer({
      stream,
      initiator,
      trickle: true,
      config: { iceServers },
    });

    peer.on("stream", (remoteStream: MediaStream) => {
      set((state) => ({
        ...state,
        peer: state.peer
          ? {
              ...state.peer,
              stream: remoteStream,
            }
          : null,
      }));
    });

    peer.on("error", console.error);
    peer.on("close", () => get().handleHangup());

    const rtcPeerConnection: RTCPeerConnection = (peer as any)._pc;
    rtcPeerConnection.oniceconnectionstatechange = async () => {
      if (
        rtcPeerConnection.iceConnectionState === "disconnected" ||
        rtcPeerConnection.iceConnectionState === "failed"
      ) {
        get().handleHangup();
      }
    };

    return peer;
  },

  completePeerConnection: (data) => {
    const localStream = get().localStream;
    if (!localStream) {
      console.log("Missing the localStream");
      return;
    }
    const peer = get().peer;
    console.log(peer,'peeer');
    if (peer) {
      peer.peerConnection?.signal(data.sdp);
      return;
    }

    const newPeer = get().createPeer(localStream, true);
    set({
      peer: {
        peerConnection: newPeer,
        participantUser: data.ongoingCall.participants.receiver,
        stream: undefined,
      },
    });

    newPeer.on("signal", async (signalData: SignalData) => {
      const { socket } = get();
      if (socket) {
        socket.emit("webrtcSignal", {
          sdp: signalData,
          ongoingCall: data.ongoingCall,
          isCaller: true,
        });
      }
    });
  },

  handleJoinCall: async (ongoingCall) => {
    console.log("joining");
    set((state) => {
      if (state.ongoingCall) {
        return {
          ongoingCall: {
            ...state.ongoingCall,
            ...ongoingCall,
            isRinging: false,
          },
        };
      } else {
        return {
          ongoingCall: {
            ...ongoingCall,
            isRinging: false,
          },
        };
      }
    });

    const stream = await get().getMediaStream();
    if (!stream) {
      console.log("Could not gt stream in handleJoinCall");
      return;
    }

    const newPeer = get().createPeer(stream, true);
    if(!newPeer){
      console.log('peer illaaa');
    }
    set({
      peer: {
        peerConnection: newPeer,
        participantUser: ongoingCall.participants.receiver as User,
        stream: undefined,
      },
    });

    newPeer.on("signal", async (data: SignalData) => {
      console.log('going to signaling');
      const { socket } = get();
      console.log(socket,'socketr after signalinggg');
      if (socket) {
        socket.emit("webrtcSignal", {
          sdp: data,
          ongoingCall,
          isCaller: false,
        });
      }
    });
  },

  initializeSocket: () => {
    const authStore = userDetailsStore.getState();
    console.log("1",authStore);
    const user = authStore.user;
    const userId = authStore.user?.id
    console.log("2",user);
    // const socket = userDetailsStore.getState();
    // console.log("3",socket);
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL, {
      query: { userId },
    });
    set({socket:newSocket})
    // const newSocket = socket.socket
    console.log("newSocket",newSocket,"auth store",authStore);
    if (!user || !user?.id) {
      console.error("User is not properly authenticated");
      return;
    }

    //This is for consoling nothing else
    newSocket?.on("connect", () => {
      console.log("Socket connected!");
    });
    newSocket?.onAny((event, ...args) => {
      console.log('Received event:', event, args);
    });
    newSocket?.on("error", (err) => {
      console.error('Socket error:', err);
    });



    // const socketSetting = io(`${BACKEND_URL}`);
    // console.log("connecting",newSocket);
    // set({ socket: newSocket });


    const onConnect = () => {
      set({ isSocketConnected: true });
      console.log("user connected", user.id);
      newSocket?.emit("user_connected", user?.id);
    };

    const onDisconnect = () => {
      set({ isSocketConnected: false });
    };

    newSocket?.on("incomingcall", (callData) => {
      console.log("Incoming call received👍:", callData);
      get().handleIncomingCall(callData);
    });

    newSocket?.on("webrtcSignal", (data) => {
      get().completePeerConnection(data);
    });

    newSocket?.on("callCancelled", (data) => {
      get().handleCallCancelled(data.message);
    });

    newSocket?.on("callEnded", (data) => {
      get().handleCallCancelled(data.message);
    });

    newSocket?.on("connect", onConnect);
    newSocket?.on("disconnect", onDisconnect);

    return () => {
      newSocket?.off("connect", onConnect);
      newSocket?.off("disconnect", onDisconnect);
      newSocket?.off("incomingcall");
      newSocket?.off("webrtcSignal");
      newSocket?.disconnect();
    };
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isSocketConnected: false });
    }
  },
}));

export const useSocket = () => {
  const socketState = useSocketStore();
  if (!socketState) {
    throw new Error("Socket state is not initialized");
  }
};
