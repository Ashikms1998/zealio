import { MouseEventHandler } from "react";
import { string } from "zod";

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

export interface spotifyToken{
    token:string
}
