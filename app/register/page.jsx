'use client'

import Loader from "@components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"

const AddUser = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const {data: session, status} = useSession();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      alert("Sva polja su obavezna.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        }),
      });

      if (res.ok) {
        router.push("/users");
      } else {
        throw new Error("Failed to add user!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (status === 'loading') {
    return <Loader />
  }

  if (status === 'unauthenticated' || session?.user?.role !== 'administrator') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-200 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Pristup zabranjen</h2>
          <p className="text-gray-600">Nemate pristup ovoj stranici!</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#d5d5d5]">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded shadow-lg p-10">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Ime i prezime:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Unesite ime i prezime..." />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-mail adresa:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Unesite e-mail adresu..." />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Password:</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="password" placeholder="Unesite password..." />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Uloga:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="konobar">Konobar</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Potvrda</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddUser