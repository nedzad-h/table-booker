import ReservationPreview from "@components/ReservationPreview";

const getReservationById = async (id) => {
  try {
    const res = await fetch(`https://table-booker.vercel.app/api/reservations/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function ReservationView({ params }) {
  const { id } = params;
  const { reservation } = await getReservationById(id);
  return <ReservationPreview reservation={reservation} />
}