import { Mail, MapPin } from 'lucide-react'

function BusinessInfo({business}) {
  
  return business?.name&&(
    <div className='md:flex flex-col gap-4 items-center'>
      <img src={business?.image}
        alt={business?.name}
        className='rounded-full h-[150px] w-[150px]
        object-cover'
      />
      <div className='flex justify-between items-center w-full'>
      <div className='flex flex-col mt-4 md:mt-0 items-baseline gap-3'>
        <h2 className='text-primary p-1 px-3
        text-lg 
        bg-purple-100 rounded-full'>{business?.category?.name}</h2>
        <h2 className='text-[40px] font-bold'>{business?.name}</h2>
      <h2 className='flex gap-2 text-lg text-gray-500'><MapPin/> {business?.address}</h2>
      <h2 className='flex gap-2 text-lg text-gray-500'>
        <Mail/>
        {business?.email}</h2>
      </div>
      </div>
      <h2 className='font-bold text-[25px] '>Description</h2>
      <p className='mt-4 text-lg text-gray-600'>{business?.about}</p>
    </div>
  )
}

export default BusinessInfo