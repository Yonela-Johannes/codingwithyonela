import FormModal from "../FormModal";
import Pagination from "../Pagination";
import Table from "../Table";
import TableSearch from "../TableSearch";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneRightCircle } from "react-icons/ai";
import { getAllFeedback } from "../../../features/feedback/feedbackSlice";

const columns = [
    {
        header: "Message",
        accessor: "message",
    },
    {
        header: "Company",
        accessor: "company",
        className: "hidden md:table-cell",
    },
    {
        header: "Posted by",
        accessor: "user",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];


const AdminFeedback = () =>
{
    const { loading, feedback } = useSelector((state) => state.feedback)
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate(

    )
    useEffect(() =>
    {
        dispatch(getAllFeedback())
    }, [])

    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm"
        >
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.message?.slice(0, 60)}...</h3>
                    <p className="text-xs text-gray-500">{item?.name} {" "} {item?.lastname}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.company}</td>
            <div className="flex gap-2">
                <div className="">
                    <h3 className="font-semibold">{item?.name} { } {item.lastname}</h3>
                    <p className="text-xs text-gray-500">{item?.is_admin ? "Admin" : item?.is_staff ? "Staff" : 'User'}</p>
                </div>
            </div>
            <td>
                <div className="flex items-center gap-2">
                    <Link to={`/admin/feedback/${item.id}`}>
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
                <h1 className="hidden md:block text-lg font-semibold">Feedback</h1>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={feedback} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    );
};

export default AdminFeedback;
