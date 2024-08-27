import FormModal from "../FormModal";
import Pagination from "../Pagination";
import Table from "../Table";
import TableSearch from "../TableSearch";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneRightCircle } from "react-icons/ai";
import { getAllRecommendations } from "../../../features/recommenation/recommendationSlice";
import { getAllprojects } from "../../../features/project/projectSlice";

const columns = [
    {
        header: "Avatar",
        accessor: "profile",
    },
    {
        header: "Project ID",
        accessor: "id",
        className: "hidden md:table-cell",
    },
    {
        header: "Status",
        accessor: "project_status",
        className: "hidden md:table-cell",
    },
    {
        header: "Priority",
        accessor: "priotity",
        className: "hidden md:table-cell",
    },
    {
        header: "Language/Stack",
        accessor: "tag_name",
        className: "hidden md:table-cell",
    },
    {
        header: "Manager",
        accessor: "manager",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];


const AdminProjects = () =>
{
    const { loading, projects } = useSelector((state) => state.project)
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() =>
    {
        dispatch(getAllprojects())
    }, [])

    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-smm"
        >
            <td className="flex items-center gap-4 p-4">
                <img
                    src={item?.image}
                    alt=""
                    className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.project_name}</h3>
                    <p className="text-xs text-gray-500">{item?.link}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.id}</td>
            <td className="hidden md:table-cell">{item.project_status}</td>
            <td className="hidden md:table-cell">{item.priority}</td>
            <td className="hidden md:table-cell">{item.tag_name}</td>
            <div className="flex gap-2">
                <img
                    src={item?.profile}
                    alt=""
                    className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                />
                <div className="">
                    <h3 className="font-semibold">{item.firstname} { } {item.lastname}</h3>
                    <p className="text-xs text-gray-500">{item?.is_admin ? "Admin" : item?.is_staff ? "Staff" : 'User'}</p>
                </div>
            </div>
            <td>
                <div className="flex items-center gap-2">
                    <Link to={`/admin/projects/${item.id}`}>
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
                <h1 className="hidden md:block text-lg font-semibold">Projects</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <button onClick={() => navigate('/admin/new-project')} className="rounded-full p-2 bg-bg_lightest font-semibold">
                        New project
                    </button>
                    <TableSearch />
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={projects} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    );
};

export default AdminProjects;
