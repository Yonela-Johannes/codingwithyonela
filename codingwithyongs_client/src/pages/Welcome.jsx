const Welcome = () => {


  return (
    <div className="absolute z-40 flex items-center justify-center top-0 left-0 bottom-0 right-0 h-screen backdrop-blur-[67px] w-screen">
      <div className="flex flex-col gap-4 w-[1040px]">
        <div className="flex flex-col items-center justify-center text-center rounded-[12px] h-[400px] w-[1000] bg-table_bg shadow-md">
          <p className='text-[30px] font-[400px] leading-[3.5rem] mt-[70px]'>
            Hey Yonela 👋 welcome to CodingWithYongs<br />
            Ready to create your first report?</p>
          <div className='mb-[70px] mt-[70px]'>
          {/* <Button title="Get Started" active={true} /> */}
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default Welcome;