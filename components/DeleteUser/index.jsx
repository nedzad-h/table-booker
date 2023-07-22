"use client"

import { useSession } from "next-auth/react";

const DeleteUser = ({ userId }) => {

  const { data: session } = useSession();

  const handleDelete = async () => {
    console.log(session.user);
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${session?.user?.accessToken}`
        },
        method: "DELETE"
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button disabled={userId === session?.user?._id} onClick={() => handleDelete(userId)} type="button" className="flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded-full focus:outline-none focus:ring focus:ring-red-300">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  )
}

export default DeleteUser