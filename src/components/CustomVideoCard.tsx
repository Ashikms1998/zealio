import Image from "next/image";
import { CustomVideoCardProps } from "../../types";

const CustomVideoCard = ({ videoUrls }: CustomVideoCardProps) => {

  const getRandomPosition = () => ({
    top: `${Math.floor(Math.random() * 90)}%`,
    left: `${Math.floor(Math.random() * 90)}%`,
  });


  return (
    <div className="relative h-screen w-full">
      {videoUrls.map((url, index) => (
        <video
          key={index}
          src={url}
          controls
          className="absolute"
          style={getRandomPosition()}
          width="300"
          height="200"
        />
      ))}
    </div>
  )
}

export default CustomVideoCard