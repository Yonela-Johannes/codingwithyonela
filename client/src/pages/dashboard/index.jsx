import Posts from "../../components/dashboard/Posts";
import UsersChart from "../../components/dashboard/UsersChart";
import CountChart from "../../components/dashboard/CountChart";
import EventCalendar from "../../components/dashboard/EventCalendar";
import UserCard from "../../components/dashboard/UserCard";

const AdminPage = () =>
{
    // const { loading: load_events, events } = useSelector((state) => state.event)
    // const { loading: load_projects, projects } = useSelector((state) => state.project)
    // const { users } = useSelector((state) => state.users)
    // const { loading: load_users, currentUser } = useSelector((state) => state.user)
    // const { loading: load_feedback, feedback } = useSelector((state) => state.feedback)
    // const { loading: load_recom, recommendations } = useSelector((state) => state.recommendation)
    // const { loading: load_blogs, blogs } = useSelector((state) => state.blogs)
    const dispatch = useDispatch()

    // useEffect(() =>
    // {
    //   dispatch(getUsers())
    // }, [])

    // useEffect(() =>
    //     {
    //         dispatch(getAllprojects())
    //     }, [users])

    // useEffect(() =>
    //     {
    //         dispatch(getAllEvents())
    //     }, [projects])

    // useEffect(() =>
    //     {
    //         dispatch(getAllFeedback())
    //     }, [events])

    // useEffect(() =>
    //     {
    //         dispatch(getAllRecommendations())
    //     }, [feedback])

    // useEffect(() =>
    //     {
    //         dispatch(getAllBlogs())
    //     }, [recommendations])

    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* LEFT */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* USER CARDS */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="student" />
                    <UserCard type="teacher" />
                    <UserCard type="parent" />
                    <UserCard type="staff" />
                </div>
                {/* MIDDLE CHARTS */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* COUNT CHART */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountChart />
                    </div>
                    {/* ATTENDANCE CHART */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <UsersChart />
                    </div>
                    <div className="w-full lg:w-1/3 flex flex-col gap-8">
                        <Posts />
                    </div>
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <EventCalendar />
                <Posts />
            </div>
        </div>
    );
};

export default AdminPage;
