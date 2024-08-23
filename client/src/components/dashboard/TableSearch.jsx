import { AiOutlineSearch } from "react-icons/ai";

const TableSearch = () =>
{
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <AiOutlineSearch size={20} />
      <input
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;
