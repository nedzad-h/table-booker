"use client"

import EditBooking from "@components/EditBooking"
import { useSession } from "next-auth/react"

const ReservationPreview = ({ reservation }) => {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex justify-center items-center py-6">
        <div className="max-w-md w-full bg-[#e1e1e1] rounded shadow-lg p-6 mx-6 h-[900px]">
          <h2 className="text-2xl font-bold mb-4">Detalji rezervacije</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Ime i prezime:</label>
            <p className="text-gray-800 text-lg" id="name">{reservation.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-mail adresa:</label>
            <p className="text-gray-800 text-lg" id="email">{reservation.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Telefon:</label>
            <p className="text-gray-800 text-lg" id="phone">{reservation.phone}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Datum:</label>
            <p className="text-gray-800 text-lg" id="date">{reservation.date}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">Vrijeme:</label>
            <p className="text-gray-800 text-lg" id="start">{reservation.start}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="people">Broj odraslih:</label>
            <p className="text-gray-800 text-lg" id="people">{reservation.numberOfPeople}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="children">Broj djece:</label>
            <p className="text-gray-800 text-lg" id="children">{reservation.numberOfChildren}</p>
          </div>
          <div className="mb-4 overflow-y-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requests">Specijalni zahtjevi:</label>
            {
              reservation.specialRequests === "" ? (
                <p className="text-gray-800 text-lg" id="requests">/</p>
              ) : (
                <p className="text-gray-800 text-lg" id="requests">{reservation.specialRequests}</p>
                )
            }
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">Kod rezervacije:</label>
            <p className="text-gray-800 text-lg" id="people">{reservation.code}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">Status:</label>
            <p className="text-gray-800 text-lg first-letter:capitalize" id="people">{reservation?.status}</p>
          </div>
          {
            (session) ? (
              <EditBooking booking={reservation} />
            ) : (
              <span />
            )
          }
        </div>
      </div>
    </>
  )
}

export default ReservationPreview