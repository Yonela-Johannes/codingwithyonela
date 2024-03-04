import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='flex items-start gap-3 flex-col pt-8 h-[40%]'>
      <h2 className='text-5xl mb-3'>Becoming a better <br />
      programmer</h2>
      <button onClick={() => navigate('/sign-in')}>Join Me</button>
    </div>
  )
}

export default Header
