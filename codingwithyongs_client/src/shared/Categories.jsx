import HoverUnderLine from "../components/HoverUnderLine";
import { IoMdDoneAll } from "react-icons/io";
import { MdFeaturedPlayList, MdRemoveRedEye, MdTimer } from "react-icons/md";

const Categories = () => {
  return (
    <div className="md:pr-8 xl:w-[400px]">
      <div className="mb-8">
        {/* Status list */}
        <div className="py-2">
          <p className="text-sm border-b border-bg_light font-bold">Status</p>
        </div>
        <div className="flex flex-col gap-3 ml-3 font-semibold">
          <HoverUnderLine>
            <p className="text-sm flex items-center gap-2">
              <MdFeaturedPlayList /> All
            </p>
          </HoverUnderLine>
          <HoverUnderLine>
            <p className="text-sm flex items-center gap-2">
              <IoMdDoneAll /> Completed
            </p>
          </HoverUnderLine>
          <HoverUnderLine>
            <p className="text-sm flex items-center gap-2">
              <MdRemoveRedEye /> Watching
            </p>
          </HoverUnderLine>
          <HoverUnderLine>
            <p className="text-sm flex items-center gap-2">
              <MdTimer />
              Upcoming
            </p>
          </HoverUnderLine>
        </div>
      </div>
      <div>
        {/* Category list */}
        <div className="py-2">
          <p className="text-sm border-b border-bg_light font-bold">Category</p>
        </div>
        <div className="flex flex-col gap-3 ml-3 font-semibold">
          <HoverUnderLine>
            <p className="text-sm flex items-center gap-2">Python</p>
          </HoverUnderLine>
          <HoverUnderLine>
            <p className="text-sm flex items-center gap-2">JavaScript</p>
          </HoverUnderLine>
        </div>
      </div>
    </div>
  );
};

export default Categories;
