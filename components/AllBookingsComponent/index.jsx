"use client"

import ReservationPreview from "@components/ReservationPreview";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AllBookingsComponent = ({ date, searchTerm }) => {

  const [allReservations, setAllReservations] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
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

  return (
    <> 
        <div className="w-10/12">
          <div className="container mx-auto my-auto px-4">
            <div className="flex flex-wrap">

              {
                date === "" ? (
                  allReservations?.map((r) => {
                    return (
                      <div hidden={!r.name.toLowerCase().includes(searchTerm.toLowerCase()) && !r.email.toLowerCase().includes(searchTerm.toLowerCase()) && (searchTerm !== "" || date !== "")} key={r._id} className="w-full md:w-1/2 lg:w-1/3">
                        <ReservationPreview reservation={r} />
                      </div>
                    )
                  })
                ) : (
                  allReservations?.map((r) => {
                    return (
                      <div hidden={!r.name.toLowerCase().includes(searchTerm.toLowerCase()) && !r.email.toLowerCase().includes(searchTerm.toLowerCase()) || r.date !== date} key={r._id} className="w-full md:w-1/2 lg:w-1/3">
                        <ReservationPreview reservation={r} />
                      </div>
                    )
                  })
                )
              }  
            </div>
         </div>
        </div>
    </>
  )
}

export default AllBookingsComponent;