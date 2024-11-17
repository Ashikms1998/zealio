'use client';
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { userDetailsStore } from "@/zustand/userAuth";
import { useEffect, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { Dropdown } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_API_URL as string;

const Navbar = () => {
  const router = useRouter()
  
  interface userTs {
    id: string,
    firstName: string,
    lastName: string

  }
  const [userDetails, setUserDetails] = useState<userTs | null | undefined>(undefined);

  useEffect(() => {
    const user = userDetailsStore.getState().user;
    setUserDetails(user);
  }, []);



  const handleLogout = async () => {
    try {
      const res = await axios.post(`${url}/auth/logout`, {}, { withCredentials: true })
      console.log(res)
      if (res.status === 200) {
        localStorage.removeItem('auth-storage')
        localStorage.removeItem('accessToken')
        localStorage.removeItem("zustand-persist");
        const { logout } = userDetailsStore.getState();
        logout()
        router.push("/login")
      }
    } catch (error) {
      console.error("Loggingout failed", error)
      localStorage.removeItem('auth-storage');
      router.push("/login");
    }
  }

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image src="/Zealio_-blkBg-removebg-preview.png" alt="Zealio logo" width={150} height={1} className="object-contain" />
        </Link>

        <div className="flex gap-14 mt-5">
          <Link href="/home" className="flex justify-center items-center text-black-700 font-bold mb-4">
            Focus Room
          </Link>
          <Link href="/rules" className="flex justify-center items-center text-black-700 font-bold mb-4">
            Rules
          </Link>
          <Link href="/contact-us" className="flex justify-center items-center text-black-700 font-bold mb-4">
            Contact Us
          </Link>
          <Link href="/about" className="flex justify-center items-center text-black-700 font-bold mb-4">
            About
          </Link>
        </div>

        {userDetails ? (
          <div className="flex items-center gap-4">


            <Dropdown label={<span className="text-black font-semibold">{userDetails?.firstName}<FontAwesomeIcon icon={faCaretDown} className="ml-1 text-black" /></span>} dismissOnClick={false}>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>

            </Dropdown>

            <button
              className="flex justify-center items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
              onClick={() => window.location.href = '/study/youtube'}
            >
              YouTube
            </button>
          </div>
        ) : (
          <div>
            <Link href="/signin">
              <CustomButton
                title="Sign Up"
                btnType="button"
                containerStyles="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              />
            </Link>
            <Link href="/login">
              <CustomButton
                title="Log In"
                btnType="button"
                containerStyles="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              />
            </Link>
          </div>
        )
        }
      </nav>
    </header>
  );
};

export default Navbar;
