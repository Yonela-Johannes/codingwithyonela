import { RiSendPlaneFill } from "react-icons/ri";

const Sender = () => {
  return (
    <div className='md:w-[70%]'>
      <form className='flex bg-white border rounded-md border-bg_light'>
        <textarea rows="1" placeholder='What do you think / anything you want to share ?' />
        <button type="submit" className="border-none">
            <RiSendPlaneFill />
        </button>
      </form>
    </div>
  )
}

export default Sender
