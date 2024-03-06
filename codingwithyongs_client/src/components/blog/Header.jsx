const Header = ({ statusses }) => {
  return (
    <div className="flex gap-2">
      {statusses?.map((status) => (
        <div key={status?._id} className="flex gap-2">
          <button>{status}</button>
        </div>
      ))}
    </div>
  );
};
export default Header;
