"use client";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { User } from '../../../../types/User';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import Modal from '@/components/Modal'
const url = process.env.NEXT_PUBLIC_API_URL as string;


const page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);


  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.length < 1) {
        const updateUser = async () => {
          const res = await axios.post(`${url}/auth/userLog`);
          console.log(res, "data from userLog")
          setUsers(res.data.data || []);
        };
        updateUser();
      }
      setLoading(true);
      try {
        console.log(url)
        const response = await axios.get(`${url}/auth/users/search?q=${searchTerm}`)
        console.log(response.data.data, "front il vanna responsed saanm")
        setUsers(response.data.data || []);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    }

    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);

  }, [searchTerm]);




  const toggleBlockUser = async (userId: string, isBlocked: boolean) => {
    try {
      console.log(userId,isBlocked,"triggered item");
      const response = await axios.put(`${url}/auth/users/block-unblock`, { userId, isBlocked: !isBlocked });
      console.log(response,'response here');
      const updatedUser = response.data.data;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      )

    } catch (error) {
      console.error('Error blocking/unblocking user', error);
    }
  }

  const handleBlockClick = (userId: string, isBlocked: boolean) => {
    setSelectedUserId(userId);
    setOpen(true);
  }


  return (
    <div className="p-4 border-2 border-gray-200 dark:border-gray-700 mt-14">
      <h1 className="flex justify-center font-bold text-3xl underline">
        USER MANAGEMENT
      </h1>

      <div className="flex justify-center border-l-neutral-950 pt-6"></div>
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 pt-11">
        <div className="flex justify-between items-center pb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email"
            className="border border-gray-300 p-2 rounded-lg w-full max-w-md"
          />
          {loading && <p>Loading...</p>}
        </div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6  text-gray-600 font-bold uppercase text-center">
                Name
              </th>
              <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">
                Email
              </th>
              <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">
                Status
              </th>
              <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="w-1/4 py-4 px-6 text-center text-gray-800">
                  {`${user.firstName} ${user.lastName}`}
                </td>
                <td className="w-1/4 py-4 px-6 text-center text-gray-800">
                  {user.email}
                </td>
                <td className="w-1/4 py-4 px-6 text-center text-gray-800">
                  {user.isBlocked ? 'Blocked' : 'Active'}</td>
                <td className="w-1/4 py-4 px-6 text-center text-gray-800">
                  <button
                    onClick={() => handleBlockClick(user.id, user.isBlocked)}
                    className={`py-2 px-4 ${user.isBlocked ? 'bg-green-500' : 'bg-red-500'} text-white`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>


                </td>
              </tr>

            ))}

          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <BsTrash size={56} className="mx-auto text-red-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Action</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to {users.find(u => u.id === selectedUserId)?.isBlocked ? 'unblock' : 'block'} this user?
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="btn btn-danger w-full"
              onClick={() => {
                const user = users.find(u => u.id === selectedUserId);
                if (user) {
                  toggleBlockUser(user.id, user.isBlocked);
                  setOpen(false);
                }
              }}
            >
              Confirm
            </button>
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>


    </div>
  );
}

export default page