import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "./github/UserProfile";
import { useEffect } from "react";
import { getAllTitles } from "../features/title/titleSlice";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";
import { disableAuthModals, updateUser } from "../features/user/authSlice";
import { Spinner } from "flowbite-react";

const EditAccount = () => {
  const { currentUser, loading, updateSucess } = useSelector(
    (state) => state.user
  );
  const { titles } = useSelector((state) => state.titles);
  const [username, setUsername] = useState(currentUser?.username || "");
  const [title, setTitle] = useState(currentUser?.title || "");
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTitles());
  }, []);

  const getUserFromGithub = async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    if (data.message) {
      return toast({
        title: "Error",
        description:
          data.message === "Not Found" ? "User not found" : data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setUserData(data);
  };

  useEffect(() => {
    if (currentUser && currentUser?.github_username) {
      getUserFromGithub(currentUser?.github_username);
    }
  }, ["", currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    setUserData(null);
    try {
      getUserFromGithub(query);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!title) return toast("Provide your profession");
    if (!query)
      return toast("If you in an IT profession provide you GitHub account");
    if (!username) return "Error provide username";
    const data = {
      id: currentUser?.id,
      title_id: title,
      username: username,
      github_username: query,
    };
    dispatch(updateUser(data));
  };

  useEffect(() => {
    if (updateSucess) {
      toast("Profile updated sucessfull");
      dispatch(disableAuthModals());
    }
  }, [updateSucess]);

  console.log(currentUser);
  console.log(query);
  return (
    <div className="grid lg:grid-cols-2 h-full w-full">
      <div className="flex lg:mx-3">
        <div
          className={`w-full max-w-md lg:p-8 space-y-6 ${
            theme == "light" ? "text-black" : "text-white"
          }`}
        >
          <form className="space-y-4" onSubmit={handleContinue}>
            <div>
              <label
                htmlFor="username"
                className={`${
                  theme == "light" ? "text-black" : "bg-bg_card text-white"
                }`}
              >
                Username
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 mt-1 border ${
                  theme == "light"
                    ? "text-black bg-gray-200"
                    : "bg-bg_card text-white"
                }`}
                placeholder="john"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className={`${
                  theme == "light" ? "text-black" : "bg-bg_card text-white"
                }`}
              >
                Title
              </label>
              <select
                value={currentUser?.user_title_id}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 mt-1 border ${
                  theme == "light"
                    ? "text-black bg-bg_light"
                    : "bg-bg_grey text-white"
                } rounded-md`}
              >
                {titles?.map((element) => (
                  <>
                    <option value="" disabled selected hidden>
                      Select profession
                    </option>
                    <option key={element?.id} value={element?.id}>
                      {element?.user_title}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="githubUser"
                className={`${
                  theme == "light" ? "text-black" : "bg-bg_card text-white"
                }`}
              >
                GitHub Username
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className={`w-full px-3 py-2 mt-1 border ${
                    theme == "light"
                      ? "text-black bg-gray-200"
                      : "bg-bg_card text-white"
                  } rounded-none`}
                  placeholder="johndoe"
                  id="githubUser"
                  value={currentUser?.github_username}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  className={`flex items-center justify-center rounded-none px-4 py-2 text-center border-none ${
                    theme == "light"
                      ? "text-black"
                      : "bg-bg_card text-white"
                  }  ${!query ? "opacity-[0.5]" : "opacity-1"}`}
                  disabled={!query}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold text-white ${
                  theme == "light" ? "bg-clr_alt" : "bg-clr_alt"
                }  ${!username ? "opacity-[0.5]" : "opacity-1"}`}
                disabled={!username}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {userData && <UserProfile userData={userData} theme={theme} />}
    </div>
  );
};
export default EditAccount;
{
  /* <Repos reposUrl={userData.repos_url} /> */
}
