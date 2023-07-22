"use client"

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { QuestionMarkCircleIcon as QuestionMarkCircleIconSolid } from '@heroicons/react/24/solid'

export default function ConfirmBookingModal({ booking }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const cancelButtonRef = useRef(null);

  return (
    <>
      <button onClick={() => setOpen(!open)} type="button" className="flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full focus:outline-none focus:ring focus:ring-blue-300">
        <QuestionMarkCircleIconSolid className="h-6 w-6 text-white" aria-hidden="true" />
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Tražite više informacija o rezervaciji
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 text-justify">
                            Tražite više informacija o rezervaciji. Unesite poruku koju želite poslati osobi koja je tražila rezervaciju. Poruka će biti poslana na odgovarajuću e-mail adresu.
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
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requests">Poruka:</label>
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
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Pošalji
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