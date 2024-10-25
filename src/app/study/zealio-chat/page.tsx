import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Sidebar from "../../../components/MessageContainer/Sidebar";
import MessageContainer from "@/components/MessageContainer/messages/MessageContainer";

const BackgroundBeamsWithCollisionDemo = () => {
    return (
        <BackgroundBeamsWithCollision>
            <div className='flex sm:h-[450px] md:h-[550px] w-6/12 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding text-white backdrop-filter backdrop-blur-lg bg-opacity-10'>
                <Sidebar />
                <MessageContainer />
            </div>
        </BackgroundBeamsWithCollision>
    );

}
export default BackgroundBeamsWithCollisionDemo;

