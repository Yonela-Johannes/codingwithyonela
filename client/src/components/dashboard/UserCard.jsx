const UserCard = ({ icon, title, data }) =>
{
  return (
    <div className="rounded-2xl odd:bg-bg_lightest even:bg-bg_lighter p-4 flex-1 min-w-[130px] w-max">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          {new Date().toDateString}
        </span>
      </div>
      <h1 className="text-2xl font-semibold my-4">{data?.length}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{title}</h2>
    </div>
  );
};

export default UserCard;
