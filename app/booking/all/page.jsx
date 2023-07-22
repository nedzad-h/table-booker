'use client'

import { useState } from "react";
import AllBookingsComponent from "@components/AllBookingsComponent";
import { useSession } from "next-auth/react";

const BookingsWrapper = () => {

  const { data: session } = useSession();

  const today = new Date();
  let dd = today.getDate().toString();

  let mm = (today.getMonth() + 1).toString(); 
  const yyyy = today.getFullYear().toString();

  if(dd<10) 
  {
      dd='0'+dd;
  } 

  if(mm<10) 
  {
      mm='0'+mm;
  } 

  const [date, setDate] = useState(`${yyyy}-${mm}-${dd}`);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    session && (
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
                    className="border-2 border-gray-500 p-1 text-lg w-[200px]"
                  >Svi datumi</button>
                  <br />
                  <button
                    onClick={() => setDate(`${yyyy}-${mm}-${dd}`)}
                    className="border-2 border-gray-500 p-1 text-lg w-[200px]"
                  >Današnji datum</button>
              </div>
            </li>
            <li className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Ime i prezime/E-mail</label>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="searchTerm" type="text" placeholder="Tražite po imenu ili e-mailu" />
              <button
                    onClick={() => setSearchTerm("")}
                    className="border-2 p-1 text-lg"
                  >Poništi pretragu</button>
            </li>
          </ul>
        </div>
        <AllBookingsComponent searchTerm={searchTerm} date={date} />
      </div>
    )
  )
}

export default BookingsWrapper