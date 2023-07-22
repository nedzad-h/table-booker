import Provider from '@SessionProvider'
import Navbar from '@components/Navbar'
import '@styles/global.css'


export const metadata = {
  title: 'Booker',
  description: 'Some desc'
}

const layout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <main>
          <Provider>
            <Navbar />
            {children}
          </Provider>
        </main>
      </body>
    </html>
  )
}

export default layout