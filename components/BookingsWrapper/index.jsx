"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ReservationPreview from "@components/ReservationPreview";

const BookingsWrapper = () => {

  const [allReservations, setAllReservations] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session?.user?.accessToken);
    const getReservations = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/reservations", {
          headers: {
            'Authorization': `Bearer ${session?.user?.accessToken}` 
          }
        });
    
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }
        const data = await res.json();
        setAllReservations(data.allReservations);
      } catch (error) {
        console.log("Error loading topics: ", error);
      }
    };

    getReservations();
  }, [session, session?.user?.accessToken]);

  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex">
      <div className="w-2/12 bg-gray-100 h-screen">
        <ul className="p-4">
          <li className="mb-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Datum:</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)
                }
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" />
                <button
                  onClick={() => setDate("")}
                  className="border-2 p-1 text-lg"
                >Poništi datum</button>
            </div>
          </li>
          <li className="mb-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="searchTerm" type="text" placeholder="Tražite po imenu, e-mailu ili broju telefona..." />
            <button
                  onClick={() => setSearchTerm("")}
                  className="border-2 p-1 text-lg"
                >Poništi pretragu</button>
          </li>
        </ul>
      </div>
      <div className="flex w-screen">
        <div className="w-10/12">
          <div className="container mx-auto my-auto px-4">
            <div className="flex flex-wrap">
              {
                console.log(allReservations)
              }
              {/* {
                date === "" ? (
                  allReservations?.map((r) => {
                    return (
                      <div hidden={!r.name.toLowerCase().includes(searchTerm.toLowerCase()) && !r.email.toLowerCase().includes(searchTerm.toLowerCase()) && (searchTerm !== "" || date !== "")} key={r._id} className="w-full md:w-1/2 lg:w-1/3">
                        {r.name}
                      </div>
                    )
                  })
                ) : (
                  allReservations?.map((r) => {
                    return (
                      <div hidden={!r.name.toLowerCase().includes(searchTerm.toLowerCase()) && !r.email.toLowerCase().includes(searchTerm.toLowerCase())} key={r._id} className="w-full md:w-1/2 lg:w-1/3">
                        {r.name}
                      </div>
                    )
                  })
                )
              }   */}
            </div>
         </div>
        </div>
      </div>   
    </div>
  )
}

export default BookingsWrapper