import Categories from "../shared/Categories";
import Center from "../components/suggestion/Center";

const SuggestionScreen = ({user}) => {
  console.log("USERA ==>: ", user)
  return (
    <div className="flex flex-col lg:flex-row justify-between h-full">
      <div className="hidden md:max-min lg:block">
        <Categories />
      </div>
      <Center user={user} />
    </div>
  );
};

export default SuggestionScreen;
