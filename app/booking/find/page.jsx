'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FindReservation = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter()

  useEffect(() => {
    console.log(process.env.PROD_URL);
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !email) {
      alert("Sva polja su obavezna.");
      return;
    }

    try {
      const res = await fetch(`https://table-booker.vercel.app/api/reservations/find?code=${code}&email=${email}`, {
        cache: "no-store",
      });

      if (res.ok) {
        setShowAlert(false);
        const data = await res.json();
        router.push(`/booking/${data.reservations[0]._id}`);
      } else {
        throw new Error("Failed to create a reservation");
      }
    } catch (error) {
      setShowAlert(true);
      console.log(error);
    }
  };
  return (
    <>
     <div className="flex justify-center items-center h-screen bg-[#d5d5d5]">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded shadow-lg p-10">
          <div hidden={!showAlert} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Rezervacija nije pronađena</strong>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={() => setShowAlert(false)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
          <br />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Kod rezervacije:</label>
            <input value={code} onChange={(e) => setCode(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Unesite kod koji ste dobili u e-mailu..." />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">E-mail adresa:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="Unesite Vašu e-mail adresu..." />
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Pretraga</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FindReservation