import Navbar from "../components/Navbar"
import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children}) => {
  return (
    <div className="relative h-screen w-screen md:flex flex-col overflow-x-hidden bg-green-400">
        <div className="absolute h-[calc(100vh)] flex flex-col bg-orange-600 left-0 right-0 w-full">
            <Navbar />
            <Header />
                <div className='h-full  w-full md:flex flex-col justify-around bg-red-600'>
                    {children}
                </div>
            <Footer />
        </div>
    </div>
  )
}

export default Layout
