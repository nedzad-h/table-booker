import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <svg className="animate-spin h-12 w-12 text-gray-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c-3.042 0-5.824-1.135-7.938-3l3-3.906a8 8 0 004.368 1.282L12 20zm6-5.291A7.962 7.962 0 0020 12h4c0 6.627-5.373 12-12 12v-4zm-3.368-8.718A8 8 0 0012 4.069V0c6.627 0 12 5.373 12 12h-4a7.963 7.963 0 01-3.368 6.375l-3-2.647z"></path>
        </svg>
        <p className="text-gray-600">Učitavanje...</p>
      </div>
    </div>
  )
}

export default Loader