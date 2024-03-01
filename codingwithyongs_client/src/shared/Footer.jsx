import { FaFacebook, FaGithubAlt, FaInstagramSquare, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <div className='flex items-start gap-3 flex-col md:flex-row justify-between py-2 h-[50%]'>
      <div className="flex flex-col gap-10  w-full">
        <h2 className='text-xl'>Here I Share<br /> What I'm learning</h2>
        <div className="md:w-[70%]">
          <input placeholder="Enter newsletter" />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <div>
            <p className="text-base font-semibold">CWYS</p>
            <p className="text-base">CWYS</p>
            <p className="text-base">CWYS</p>
            <p className="text-base">CWYS</p>
          </div>
          <div>
            <p className="text-base font-semibold">CWYS</p>
            <p className="text-base">CWYS</p>
            <p className="text-base">CWYS</p>
            <p className="text-base">CWYS</p>
          </div>
          <div>
            <p className="text-base font-semibold">CWYS</p>
            <p className="text-base">CWYS</p>
            <p className="text-base">CWYS</p>
            <p className="text-base">CWYS</p>
          </div>
        </div>
        
        <div className="flex gap-8 text-lg">
          <FaGithubAlt />
          <FaInstagramSquare />
          <FaLinkedin />
          <FaFacebook />
        </div>
      </div>
    </div>
  )
}

export default Footer
