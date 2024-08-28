import HoverUnderLine from "../HoverUnderLine";

const List = ({ project, theme }) =>
{

  return (
    <div
      className={`${project?.status == "done"
        ? "text-green-600"
        : project?.status == "todo"
          ? "text-orange-500"
          : "text-red-900"
        } w-full h-[180px] mb-1 align-text-top text-start relative font-bold border-b`}
    >
      <div
        className="absolute top-6 z-10
      px-7 w-full"
      >
        <HoverUnderLine>
          <p
            onClick={() => activeGroupHandler()}
            className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} text-xl mb-2 font-normal text-start`}
          >
            {project?.project_name}
          </p>
        </HoverUnderLine>
        <p className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-base lg:text-md mb-2 font-normal text-start`}>{project?.description?.slice(0, 100)}...</p>
      </div>
    </div>
  );
};

export default List;
