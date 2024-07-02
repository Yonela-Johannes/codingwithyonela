import toast from "react-hot-toast";
import { Loader, UserCard } from "../shared";
import { useSelector } from "react-redux";

const AllUsers = () =>
{
  const { users, loading } = useSelector((state) => state.user)

  if (isErrorCreators)
  {
    toast("Something went wrong.");

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {loading && users?.length < 1 ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {users?.documents.map((element) => (
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
