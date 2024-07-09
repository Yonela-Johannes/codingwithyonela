import LeftSidebar from "../shared/LeftSidebar";

const RootLayout = ({ children }) =>
{
  return (
    <div className="w-full md:flex">
      <LeftSidebar />
      <section className="flex items-center justify-center flex-1 w-full h-full m-auto">
        {children}
      </section>
    </div>
  );
};

export default RootLayout;
