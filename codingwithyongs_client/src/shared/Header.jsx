import { useNavigate } from "react-router-dom"
import Hero from "../components/Hero"

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="flex gap-20 items-center">
    <div className='flex items-start gap-3 flex-col pt-8 h-[40%]'>
      <h2 className='text-5xl mb-3'>Becoming a <span className="text-clr_alt">better <br />
      programmer</span></h2>
      <button onClick={() => navigate('/sign-in')}>Join Me</button>
    </div>
    <Hero />
    </div>
  )
}

export default Header
