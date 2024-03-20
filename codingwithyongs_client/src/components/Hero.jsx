import { Search } from "lucide-react";

function Hero() {
  return (
    <div className="flex w-full mb-4 mt-6 gap-3 flex-col justify-center md:pt-14 md:pb-7">
    <div className="bg-bg_lighter rounded-md max-w-[480px]">
      <span className="italic">
        From good people you’ll learn good, but if you mingle with the bad
        you’ll destroy such soul as you had.
      </span>
      <p className="text-xs">EPICTETUS, DISCOURSES</p>
    </div>
      <div className="md:mt-4 flex gap-1 md:gap-4 items-center">
        <input placeholder="Search" className="md:w-[350px] px-2" />
        <button className="flex items-center justify-center h-[26px] w-[26px] md:rounded-full md:h-[46px] md:w-[46px] p-1 text-clr_alt md:bg-clr_alt md:text-white">
          <Search className="md:h-4 md:w-4 " />
        </button>
      </div>
    </div>
  );
}

export default Hero;
