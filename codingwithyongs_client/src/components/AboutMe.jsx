import avatar from '../assets/avatar.png'
export default function AboutMe() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <hr className="m4-8" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <div className="">
            <img src={avatar} className='w-20 h-20 rounded-full' alt="Yonela Johannes" />
          </div>
          <h2 className="text-2xl font-bold text-center break-words">
            Yonela Johannes
          </h2>
          <p className="text-center break-words">
            Software Developer
          </p>
        </div>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut <br /> labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris<br /> nisi  ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit <br /> esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
        </p>
      </div>
    </div>
  );
}
