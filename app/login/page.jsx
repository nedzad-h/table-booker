'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const logIn = async () => {
    if (password === '' || email === '') {
      alert("Fill all fields!")
      return
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long")
      return
  }

  try {
      const res = await signIn('credentials', { email, password, redirect: false })

      if (res?.error == null) {
          router.push("/booking/all")
      } else {
        alert("Error occured while logging")
      }
  } catch (error) {
      console.log(error)
  }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Prijava
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    E-mail adresa
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                      className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Šifra
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                      className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={logIn}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Prijava
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login