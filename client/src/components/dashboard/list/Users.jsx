import FormModal from "../FormModal";
import Pagination from "../Pagination";
import Table from "../Table";
import TableSearch from "../TableSearch";
import { role } from "../../../constants/data";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUsers } from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneDelete, AiTwotoneRightCircle } from "react-icons/ai";

const columns = [
  {
    header: "Avatar",
    accessor: "profile",
  },
  {
    header: "User ID",
    accessor: "id",
    className: "hidden md:table-cell",
  },
  {
    header: "Username",
    accessor: "username",
    className: "hidden md:table-cell",
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden md:table-cell",
  },
  {
    header: "Github",
    accessor: "github",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];


const Users = () =>
{
  const { users } = useSelector((state) => state.users)
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() =>
  {
    dispatch(getUsers())
  }, [])

  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <img
          src={item?.profile}
          alt=""
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.username}{" "}{item.lastname}</h3>
          <p className="text-xs text-gray-500">{item?.is_admin ? "Admin" : item?.is_staff ? "Staff" : 'User'}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td className="hidden md:table-cell">{item.github}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link to={`/admin/users/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <AiTwotoneRightCircle size={20} />
            </button>
          </Link>
          {currentUser.is_admin && (
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Users</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={users} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default Users;
