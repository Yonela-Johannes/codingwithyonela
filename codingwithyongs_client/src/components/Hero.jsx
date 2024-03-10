import { Search } from 'lucide-react'

function Hero() {
  return (
    <div className='flex items-center gap-3 flex-col justify-center pt-14 pb-7'>
        <div className='mt-4 flex gap-4 items-center'>
            <input placeholder='Search'
            className="rounded-full md:w-[350px] " />
            <button className="rounded-full h-[46px] bg-clr_alt text-white">
                <Search className='h-4 w-4 '/>
            </button>
        </div>
    </div>
  )
}

export default Hero