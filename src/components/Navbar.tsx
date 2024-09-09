import Link from "next/link"
import Image from "next/image"
import CustomButton from "./CustomButton"
// import {useAuth} from ""


const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
        <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
            <Link href="/" className="flex justify-center items-center">
                <Image src="/Zealio_-blkBg-removebg-preview.png" alt="Zealio logo" width={150} height={1} className="object-contain"/>
            </Link>
          <div className = "flex gap-14 mt-5">
            <Link href="/signin" className="flex justify-center items-center text-black-700 font-bold mb-4">
                Focus Room
            </Link>

            <Link href="/rules" className="flex justify-center items-center text-black-700 font-bold mb-4">
                Rules
            </Link>

            <Link href="/contact-us" className="flex justify-center items-center text-black-700 font-bold mb-4">
                Contact us
            </Link>

            <Link href="/about" className="flex justify-center items-center text-black-700 font-bold mb-4">
                About
            </Link>

          </div>
            <div>
            <Link href="/signin">
            <CustomButton
            title = "Sign Up"
            btnType = "button"
            containerStyles="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            />
            </Link>
            <Link href="/login">
            <CustomButton
            title = "Log In"
            btnType = "button"
            containerStyles="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            />
            </Link>
            </div>
        </nav>
    </header>
  )
}

export default Navbar