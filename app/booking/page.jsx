'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

const Booking = () => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [durationInHours, setDurationInHours] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email || !numberOfPeople || !date || !start || !durationInHours) {
      alert("Sva polja su obavezna.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          numberOfPeople,
          numberOfChildren,
          date,
          start,
          durationInHours,
          specialRequests
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a reservation");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#d5d5d5]">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded shadow-lg p-10">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Ime i prezime:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Unesite Vaše puno ime i prezime..." />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Broj telefona:</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="Unesite Vaš broj telefona..." />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-mail adresa:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Unesite Vašu e-mail adresu..." />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="people">Broj odraslih:</label>
            <input value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min={2} max={10} id="people" type="number" placeholder="Broj odraslih za rezervaciju..." />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="people">Broj djece:</label>
            <input value={numberOfChildren} onChange={(e) => setNumberOfChildren(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min={0} max={5} id="people" type="number" placeholder="Broj djece za rezervaciju..." />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Datum:</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">Vrijeme:</label>
            <input value={start} onChange={(e) => setStart(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="start" type="time" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">Dužina trajanja rezervacije (u satima):</label>
            <input value={durationInHours} onChange={(e) => setDurationInHours(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="duration" type="number" step="0.5" placeholder="Duration in hours" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requests">Posebni zahtjevi:</label>
            <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="requests" rows="3" placeholder="Ukoliko imate neke posebne zahtjeve napišite ih ovdje, a mi ćemo se potruditi da ih ispunimo." />
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Potvrda</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Booking