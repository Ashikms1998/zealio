"use client";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { User } from '../../../../types/User';
import axios from 'axios';
const url = process.env.NEXT_PUBLIC_API_URL as string;


const page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)


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

  const toggleBlockUser = async (userId: string,isBlocked:boolean) => {
    try {
      const response = await axios.put(`${url}/auth/users/block-unblock`,{ userId, isBlocked: !isBlocked });
      
      const updatedUser = response.data.data;

      setUsers((prevUsers)=>
        prevUsers.map((user)=>
          user.id === updatedUser.id ? updatedUser:user
        )
      )

    } catch (error) {
      console.error('Error blocking/unblocking user', error);
    }
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
                    onClick={() => toggleBlockUser(user.id,user.isBlocked)}
                    className={`py-2 px-4 ${user.isBlocked ? 'bg-green-500' : 'bg-red-500'
                      } text-white`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>

            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page