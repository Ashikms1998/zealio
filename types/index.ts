import { MouseEventHandler } from "react";

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

