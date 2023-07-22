import Link from "next/link"

const Home = () => {
  return (
    <section className='w-full flex-center flex-col bg-slate-400 bg-no-repeat bg-top'>
      <Link href="/booking/all">
        Sve rezervacije
      </Link>
    </section>
  )
}

export default Home