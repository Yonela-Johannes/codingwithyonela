import FormModal from "../FormModal";
import Pagination from "../Pagination";
import Table from "../Table";
import TableSearch from "../TableSearch";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneRightCircle } from "react-icons/ai";
import { getAllEvents } from "../../../features/event/eventSlice.js";

const columns = [
    {
        header: "Title",
        accessor: "title",
    },
    {
        header: "Description",
        accessor: "description",
        className: "hidden md:table-cell",
    },
    {
        header: "From datetime",
        accessor: "start_time",
        className: "hidden md:table-cell",
    },
    {
        header: "To datetime",
        accessor: "end_time",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];


const AdminEvents = () =>
{
    const { loading, events } = useSelector((state) => state.event)
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate(

    )
    useEffect(() =>
    {
        dispatch(getAllEvents())
    }, [])

    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.title}</h3>
                </div>
            </td>
            <td className="hidden md:table-cell"><p className="text-xs text-gray-500">{item?.description?.slice(0, 50)}...</p></td>
                    
            <td className="hidden md:table-cell">{item.start_time}</td>
            <td className="hidden md:table-cell">{item.end_time}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link to={`/admin/events/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full">
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
                <h1 className="hidden md:block text-lg font-semibold">Events</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <button onClick={() => navigate('/admin/new-event')} className="rounded-full p-2 bg-bg_lightest font-semibold">
                        New event
                    </button>
                    <TableSearch />
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={events} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    );
};

export default AdminEvents;
