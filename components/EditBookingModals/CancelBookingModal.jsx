"use client"

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CancelBookingModal({ booking }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Zbog prevelikog broja rezervacija, nažalost nismo u mogućnosti prihvatiti Vašu rezervaciju. Ukoliko se ukaže prilika da Vašu rezervaciju prihvatimo u traženom periodu, javit ćemo Vam se. Hvala na razumjevanju!");
  const { data: session } = useSession();
  const router = useRouter();

  const handleCancelClick = async () => {
    try {
      const body = {
        status: 'odbijeno'
      };
  
      const res = await fetch(`https://table-booker.vercel.app/api/reservations/edit/${booking._id}`, {
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        method: "PUT",
        body: JSON.stringify(body)
      });
  
      if(!res.ok){
        throw new Error("Error has occured");
      }
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  const cancelButtonRef = useRef(null);

  return (
    <>
      <button onClick={() => setOpen(!open)} type="button" className="flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded-full focus:outline-none focus:ring focus:ring-red-300">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Otkazivanje rezervacije
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 text-justify">
                            Da li ste sigurni da želite otkazati ovu rezervaciju? E-mail sa porukom o otkazivanju će biti poslan na odgovarajuću adresu.
                          </p>
                          <div className='pt-10'>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Ime i prezime:</label>
                              <p className="text-gray-800 text-lg" id="name">{booking.name}</p>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-mail adresa:</label>
                              <p className="text-gray-800 text-lg" id="email">{booking.email}</p>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Telefon:</label>
                              <p className="text-gray-800 text-lg" id="phone">{booking.phone}</p>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Datum:</label>
                              <p className="text-gray-800 text-lg" id="date">{booking.date}</p>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">Vrijeme:</label>
                              <p className="text-gray-800 text-lg" id="start">{booking.start}</p>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="people">Broj odraslih:</label>
                              <p className="text-gray-800 text-lg" id="people">{booking.numberOfPeople}</p>
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="children">Broj djece:</label>
                              <p className="text-gray-800 text-lg" id="children">{booking.numberOfChildren}</p>
                            </div>
                            <div className="mb-4 overflow-y-auto">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requests">Specijalni zahtjevi:</label>
                              {
                                booking.specialRequests === "" ? (
                                  <p className="text-gray-800 text-lg" id="requests">/</p>
                                ) : (
                                  <p className="text-gray-800 text-lg" id="requests">{booking.specialRequests}</p>
                                  )
                              }
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requests">Razlog otkazivanja:</label>
                              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Napišite poruku..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => handleCancelClick()}
                    >
                      Otkazivanje
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Nazad
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}