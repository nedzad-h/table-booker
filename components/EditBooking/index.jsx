"use client"

import CancelBookingModal from '@components/EditBookingModals/CancelBookingModal'
import ConfirmBookingModal from '@components/EditBookingModals/ConfirmBookingModal'
import DeleteBookingModal from '@components/EditBookingModals/DeleteBookingModal'
import EditBookingModal from '@components/EditBookingModals/EditBookingModal'
import { useSession } from 'next-auth/react'

const EditBooking = ({ booking }) => {
  const { data: session } = useSession();
  return (
    <div className="flex space-x-2">
      <ConfirmBookingModal booking={booking} />
      <CancelBookingModal booking={booking} />
      <EditBookingModal booking={booking} />
      {
        (session?.user?.role === 'administrator') ? (
          <DeleteBookingModal booking={booking} />
        ) : (
          <span />
        )
      }
    </div>

  )
}

export default EditBooking