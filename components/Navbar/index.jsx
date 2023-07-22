"use client"

import {signIn, signOut, useSession} from 'next-auth/react'
import Link from 'next/link';

const Navbar = () => {
  const {data: session} = useSession();
  return (
    <nav className="bg-[#5f720080] h-32">
      <div className='items-center justify-between pr-40 pl-40 w-full h-full hidden md:flex'>
        <span>
          <Link href="/">
            <img className='h-20 hover:cursor-pointer' src='https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png' />
          </Link>
        </span>    
        <div className="flex space-x-10">
          <Link className="text-white lowercase hover:uppercase tracking-widest border border-white hover:bg-white hover:border-yellow-800 hover:tracking-widest hover:text-yellow-800 rounded-none px-3 py-2 text-sm font-medium" href="/booking/find">Pronađi rezervaciju</Link>
          <Link className="text-white lowercase hover:uppercase tracking-widest border border-white hover:bg-white hover:border-yellow-800 hover:tracking-widest hover:text-yellow-800 rounded-none px-3 py-2 text-sm font-medium" href="/booking">Rezervacija</Link>
          <Link hidden={session?.user.role !== 'administrator'} className="text-white lowercase hover:uppercase tracking-widest border border-white hover:bg-white hover:border-yellow-800 hover:tracking-widest hover:text-yellow-800 rounded-none px-3 py-2 text-sm font-medium" href="/register">Dodaj korisnika</Link>
          <Link hidden={session?.user.role !== 'administrator'} className="text-white lowercase hover:uppercase tracking-widest border border-white hover:bg-white hover:border-yellow-800 hover:tracking-widest hover:text-yellow-800 rounded-none px-3 py-2 text-sm font-medium" href="/users">Pregled korisnika</Link>

          {
            (session?.user) ? (
              <button className="text-white lowercase hover:uppercase tracking-widest border border-white hover:bg-white hover:border-yellow-800 hover:tracking-widest hover:text-yellow-800 rounded-none px-3 py-2 text-sm font-medium" onClick={signOut}>Odjava</button>
            ) : (
              <button className="text-white lowercase hover:uppercase tracking-widest border border-white hover:bg-white hover:border-yellow-800 hover:tracking-widest hover:text-yellow-800 rounded-none px-3 py-2 text-sm font-medium" onClick={signIn}>Prijava</button>
            )
          }
          {
            (session?.user) ? (
              <p className="text-white tracking-widest px-3 py-2 text-sm font-medium font-bold">{session.user.name}, {session.user.role}</p>
            ) : (
              <span />
            )
          }
          <div className="flex space-x-1">
            <a href="https://www.facebook.com/ribnjak" target='_blank' className="text-white hover:text-[#1877f2]">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.instagram.com/ribarskakuca/" target='_blank' className="text-white hover:text-[#d6249f]">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="sm:hidden w-full h-full justify-center items-center" id="mobile-menu">
        <div className=" w-full h-full">
          <Link className="text-yellow-950 uppercase tracking-widest hover:text-white rounded-none px-3 py-2 text-sm font-medium" href="/">Početna</Link>
          <Link className="text-yellow-950 uppercase tracking-widest hover:text-white rounded-none px-3 py-2 text-sm font-medium" href="/about">Kontakt</Link>
          <Link className="text-yellow-950 uppercase tracking-widest hover:text-white rounded-none px-3 py-2 text-sm font-medium" href="/location">Lokacija</Link>
          <Link className="text-white uppercase tracking-widest border border-white hover:bg-white hover:border-yellow-800 hover:tracking-widest hover:text-yellow-800 rounded-none px-3 py-2 text-sm font-medium" href="/booking/find">Pronađi rezervaciju</Link>
          <Link className="text-white uppercase tracking-widest border border-white hover:bg-white hover:border-yellow-800 hover:tracking-widest hover:text-yellow-800 rounded-none px-3 py-2 text-sm font-medium" href="/booking">Rezervacija</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
