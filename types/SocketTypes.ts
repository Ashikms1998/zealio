import { User } from "./User";
import Peer from 'simple-peer'
export type CallerUser ={
    firstName:string;
    lastName:string;
    id:string,
    email?: string;
    password?: string;
    verify_token?: string;
    verified?: boolean;
    isBlocked?: boolean; 
}

export type ReceivingUser = {
    email:string,
    firstName:string,
    id:string,
    isBlocked:boolean,
    lastName:string,
    password:string
    verified:boolean,
    verify_token: string
}

export type OnGoingCall = {
    participants:Participants;
    isRinging:boolean
 }
 
 export type Participants ={
    caller:CallerUser,
    receiver:ReceivingUser
 }

 export interface PeerData {
    peerConnection?: Peer.Instance
    stream?: MediaStream | undefined
    participantUser?: User
  }

export interface IVideoCall {
    localStream: MediaStream | null
    isOnCall: boolean;
    peer: PeerData | null
}

export interface IVideoContainer {
    stream: MediaStream | null
    isLocalStream: boolean
    isOnCall: boolean
    className?: string;
  }