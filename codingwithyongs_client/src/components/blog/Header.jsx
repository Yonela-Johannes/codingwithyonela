const Header = ({ setFilterCat, categories }) => {
  return (
    <div className="flex gap-2">
      {categories?.map((element) => (
        <div key={element?.id} className="flex gap-2">
          <button onClick={() => setFilterCat(element?.category)} className="">{element?.category}</button>
        </div>
      ))}
    </div>
  );
};
export default Header;
