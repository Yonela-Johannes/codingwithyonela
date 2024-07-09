import { useSelector } from "react-redux";
import LeftSidebar from "../shared/LeftSidebar";
import Loader from "../components/Loader/Loader";

const RootLayout = ({ children }) =>
{
  const { loading, user } = useSelector((state) => state.user)
  return (
    <div className="w-full md:flex">
      {loading ? (
        <Loader />
      ) : (
        user && user?.id ? (
          <LeftSidebar />
        ) : ""
      )}
      <section className="flex items-center justify-center flex-1 w-full h-full m-auto">
        {children}
      </section>
    </div>
  );
};

export default RootLayout;
