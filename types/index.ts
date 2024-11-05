import { MouseEventHandler } from "react";
import { boolean, string } from "zod";

export interface CustomButtonProps {
    title: string;
    containerStyles?:string;
    handleClick?:
    MouseEventHandler<HTMLButtonElement>;
    btnType?: "button"| "submit";
}

export interface CustomCardProps {
    imageUrl?:string;
    title: string;
    description: string;
    containerStyles?:string;
}

export interface CustomVideoCardProps {
    videoUrls:string[];
}

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  export interface LoginForm{
    email:string;
    password:string;
  }

export interface Custom3DCardProps{
    imageUrl:string;
    title:string;
    description:string;
    onClick?: () => void;
}

export interface verifyOTP{
    verify_token:string;
}
export interface ForgotForm{
    email:string
}

export interface rePassword{
    password:string;
}


export interface SettingsContextType {
    workMinutes: number;
    breakMinutes: number;
    setWorkMinutes: (minutes: number) => void;
    setBreakMinutes: (minutes: number) => void;
    setShowSettings: (show: boolean) => void;
  }

export interface DecodedToken {
    userId: string;
    iat: number;
    exp: number;
  }

  export interface YouTubeVideo {

    id: {
        videoId: string;
      };

    snippet: {
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
}

export interface YouTubeResponse {
    items: YouTubeVideo[];
}

export interface ConversationType {
    id: string;
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    isBlocked:boolean,
    password:string
    verified:boolean,
    verify_token: string
}

export interface MessageType {
    _id: string;
    content:string;
  }

 export interface MessageTypes {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
    updatedAt: string;
  }


  export interface MessagesResponse {
    _id: string;
    participants: string[];
    messages: MessageType[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
