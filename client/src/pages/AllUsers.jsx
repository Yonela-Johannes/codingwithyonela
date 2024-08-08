import toast from "react-hot-toast";
import UserCard from "../shared/UserCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../shared/Loader'
import { useEffect } from "react";
import { getUsers } from "../features/user/userSlice";

const AllUsers = () =>
{
  const { users, loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const fetchUsers = () =>
  {
    dispatch(getUsers())
  }

  useEffect(() =>
  {
    fetchUsers()
  }, [])


  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {loading ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {users?.map((element) => (
              <li key={element?.id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={element} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
