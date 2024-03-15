import HoverUnderLine from "../components/HoverUnderLine";
import { IoMdDoneAll } from "react-icons/io";
import { MdFeaturedPlayList, MdRemoveRedEye, MdTimer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../features/category/categorySlice";
import { useEffect } from "react";

const Categories = () => {
  const { categories } = useSelector((state) => state?.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  console.log(categories)
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
        {categories && categories?.length > 0 ? (
          <>
            <div className="py-2">
              <p className="text-sm border-b border-bg_light font-bold">
                Category
              </p>
            </div>
            <div className="flex flex-col gap-3 ml-3 font-semibold">
              {categories?.map((elem) => (
                <HoverUnderLine key={elem?.key}>
                  <p className="text-sm flex items-center gap-2">{elem?.category}</p>
                </HoverUnderLine>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Categories;
