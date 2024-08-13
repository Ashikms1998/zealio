import Image from "next/image"
import { CustomCardProps } from "../../types"


const CustomCard = ({ imageUrl, title, description }: CustomCardProps) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex justify-center w-80 h-52 items-center rounded-3xl bg-gray-100">
          <div className="relative w-44 h-32 bg-white transform -rotate-12 flex justify-center rounded-3xl items-center">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title}
                width={500}
                height={500}
                quality={100}
                className="transform rotate-12 rounded-3xl object-cover w-11/12 h-5/6"
              />
            )}
          </div>
        </div>
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-black-700 font-medium mb-4">{description}</p>
        </div>
      </div>
    </>

  )
}

export default CustomCard