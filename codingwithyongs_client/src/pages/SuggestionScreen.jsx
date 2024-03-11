import Categories from "../shared/Categories";
import Center from "../components/suggestion/Center";

const SuggestionScreen = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between h-full">
      <div className="hidden md:max-min lg:block">
        <Categories />
      </div>
      <Center />
    </div>
  );
};

export default SuggestionScreen;
