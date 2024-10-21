const Wrapper = ({ children }) =>
{
  return (
    <div className="md:py-5 lg:w-[80%] overflow-x-hidden mx-auto bg-transparent">
      {children}
    </div>
  )
}

export default Wrapper
