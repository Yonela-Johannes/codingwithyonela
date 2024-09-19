import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Head } from "../shared/Head";
import { ThemeContext } from "../context/ThemeContext";
import { inputClassName, labelClassName } from "../utils/utils";

function Profile() {
  const { currentUser } = useSelector((state) => state?.user);
  const { theme } = useContext(ThemeContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [image, setImage] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    website: "",
    github: "",
    profession: "",
    description: "",
  });

  useEffect(() => {
    const handleData = { ...data };
    if (currentUser) {
      if (currentUser?.username) handleData.username = currentUser?.username;
      if (currentUser?.description) handleData.description = currentUser?.description;
      if (currentUser?.firstname) handleData.firstname = currentUser?.firstname;
      if (currentUser?.lastname) handleData.lastname = currentUser?.lastname;
      if (currentUser?.github) handleData.github = currentUser?.github;
      if (currentUser?.profession) handleData.profession = currentUser?.profession;
      if (currentUser?.website) handleData.website = currentUser?.website;

      if (currentUser?.imageName) {
        const fileName = image;
        fetch(currentUser.imageName).then(async (response) => {
          const contentType = response.headers.get("content-type");
          const blob = await response.blob();
          // @ts-ignore
          const files = new File([blob], fileName, { contentType });
          // @ts-ignore
          setImage(files);
        });
      }

      setData(handleData);
      setIsLoaded(true);
    }
  }, [currentUser]);

  const handleFile = (e) => {
    let file = e.target.files;
    const fileType = file[0]["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      setImage(file[0]);
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const setProfile = async () => {

  };

    return (
    <>
      {isLoaded && (
        <div className="flex flex-col  justify-start max-w-2xl gap-3">
          {errorMessage && (
            <div className="w-full pt-3">
              <span className="text-red-600 font-bold">{errorMessage}</span>
            </div>
          )}
          <Head title='You profile' desc='Update and edit your profile' theme={theme} />
          <div className="flex flex-col items-center w-full gap-5">
            <div
              className="flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              <label className={labelClassName(theme)} htmlFor="">
                Select a profile Picture
              </label>
              <div className="bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full cursor-pointer relative">
                {currentUser?.profile ? (
                  <img
                    src={currentUser?.profile}
                    alt="profile"
                    fill
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-6xl text-white">
                    {currentUser.email?.toUpperCase()}
                  </span>
                )}
                <div
                  className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center justify-center   transition-all duration-100  ${
                    imageHover ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span
                    className={` flex items-center justify-center  relative`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-white absolute"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="file"
                      onChange={handleFile}
                      className="opacity-0"
                      multiple={true}
                      name="profileImage"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="md:flex gap-4 w-full">
              <div className="w-full pt-3">
                <label className={labelClassName(theme)} htmlFor="userName">
                  Username
                </label>
                <input
                  className={inputClassName(theme)}
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Username"
                  value={data.username}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full pt-3">
                <label className={labelClassName(theme)} htmlFor="firstname">
                  First Name
                </label>
                <input
                  className={inputClassName(theme)}
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First nane"
                  value={data.firstname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="md:flex gap-4 w-full">
              <div className="w-full pt-3">
                <label className={labelClassName(theme)} htmlFor="website">
                  Website/Blog
                </label>
                <input
                  className={inputClassName(theme)}
                  type="link"
                  name="website"
                  id="website"
                  placeholder="Website"
                  value={data.website}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full pt-3">
                <label className={labelClassName(theme)} htmlFor="github">
                  Github Username
                </label>
                <input
                  className={inputClassName(theme)}
                  type="link"
                  name="github"
                  id="github"
                  placeholder="Github"
                  value={data.github}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className={labelClassName(theme)} htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={data.description}
                onChange={handleChange}
                className={inputClassName(theme)}
                placeholder="description"
              />
            </div>
            <button
              className="border lg:px-5 lg:py-3 bg-clr_alt text-white rounded-md"
              type="button"
              onClick={setProfile}
            >
              Set Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
