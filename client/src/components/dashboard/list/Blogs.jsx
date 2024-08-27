import FormModal from "../FormModal";
import Pagination from "../Pagination";
import Table from "../Table";
import TableSearch from "../TableSearch";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneRightCircle } from "react-icons/ai";
import { getAllBlogs } from "../../../features/blogs/blogSlice";

const columns = [
    {
        header: "Image",
        accessor: "blog_image",
    },
    {
        header: "Blog ID",
        accessor: "id",
        className: "hidden md:table-cell",
    },
    {
        header: "Category",
        accessor: "category",
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


const AdminBlogs = () =>
{
    const { loading, blogs } = useSelector((state) => state.blogs)
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate(

    )
    useEffect(() =>
    {
        dispatch(getAllBlogs())
    }, [])

    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className="flex items-center gap-4 p-4">
                <img
                    src={item?.blog_image}
                    alt=""
                    className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.blog_title}</h3>
                    <p className="text-xs text-gray-500">{item?.category}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.blog_id}</td>
            <td className="hidden md:table-cell">{item.category}</td>
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
                    <Link to={`/admin/blogs/${item.id}`}>
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
                <h1 className="hidden md:block text-lg font-semibold">Blogs</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <button onClick={() => navigate('/admin/new-blog')} className="rounded-full p-2 bg-bg_lightest font-semibold">
                        New blog
                    </button>
                    <TableSearch />
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={blogs} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    );
};

export default AdminBlogs;
