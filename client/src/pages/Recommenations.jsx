import { useDispatch, useSelector } from "react-redux";
import RecommendationCard from "../components/recommendation/RecommendationCard";
import { useContext, useEffect, useState } from "react";
import { getAllTitles } from "../features/title/titleSlice";
import { MdOutlineAdd } from "react-icons/md";
import { Modal } from "antd";
import { MdCloudUpload } from "react-icons/md";
import Dropzone from "react-dropzone";
import { createRecommendation, disableRecommendationUpdates, getAllRecommendations } from "../features/recommenation/recommendationSlice";
import Loader from "../shared/Loader";
import { getAllCountries } from "../features/countries/countrySlice";
import toast from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";
import Recommendation from "./Recommendation";
import { ModalContext } from "../context/ModalContext";

const Recommendations = () =>
{
  const { openSuggestion, setOpenSuggestion, selectedSuggestion } = useContext(ModalContext)
  const { theme } = useContext(ThemeContext)
  const { currentUser, } = useSelector((state) => state?.user);
  const { countries } = useSelector((state) => state.countries);
  const [filterValue, setFilterValue] = useState("")
  const { loading, recommendations, created } = useSelector((state) => state.recommendation);
  const [imageSrc, setImageSrc] = useState(null);
  const [open, setOpen] = useState(false);
  const { titles } = useSelector((state) => state.titles);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    account_id: "",
    name: "",
    second_name: "",
    last_name: "",
    email: "",
    quote: "",
    portfolio: "",
    github: "",
    linkedin: "",
    title_id: "",
    country: "",
    re_image: "",
  });

  useEffect(() =>
  {
    dispatch(getAllTitles());
  }, []);

  useEffect(() =>
  {
    dispatch(getAllCountries());
  }, [titles]);

  useEffect(() =>
  {
    dispatch(getAllRecommendations());
  }, [titles, countries, created]);

  const colors = [
    "pink",
    "red",
    "yellow",
    "orange",
    "cyan",
    "green",
    "blue",
    "purple",
    "geekblue",
    "magenta",
    "volcano",
    "gold",
    "lime",
  ];

  const handleChange = (e) =>
  {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () =>
  {
    if (currentUser && inputData?.name && inputData?.last_name && inputData?.email && inputData?.quote && inputData?.portfolio && inputData?.github && inputData?.linkedin && inputData?.title_id && inputData?.country, inputData.re_image)
    {
      const formData = new FormData();
      formData.append('account_id', currentUser?.id);
      formData.append('name', inputData.name);
      formData.append('second_name', inputData.second_name);
      formData.append('lastname', inputData.last_name);
      formData.append('re_image', inputData.re_image);
      formData.append('github', inputData.github);
      formData.append('linkedin', inputData.linkedin);
      formData.append('email', inputData.email);
      formData.append('portfolio', inputData.portfolio);
      formData.append('quote', inputData.quote);
      formData.append('status_id', inputData.status_id);
      formData.append('title_id', inputData.title_id);
      formData.append('country_id', inputData.country);

      dispatch(createRecommendation(formData))
      setInputData({
        account_id: "",
        name: "",
        second_name: "",
        last_name: "",
        email: "",
        quote: "",
        portfolio: "",
        github: "",
        linkedin: "",
        title_id: "",
        country: "",
        re_image: "",
      })
    } else
    {
      toast("Missing data. Provide all information")
    }
  }

  useEffect(() =>
  {
    if (created)
    {
      setOpen(false)
      dispatch(disableRecommendationUpdates())
    }
  }, [created])

  return (
    <div className="h-full my-5">
      <div className="flex items-start w-full mb-8 justify-between">
        {titles && titles?.length > 0 ? (
          <div className="grid grid-cols-1 w-max gap-2">
            <select onChange={(e) => setFilterValue(e.target.value)}
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-bg_light" : "bg-bg_grey text-white"} rounded-md`}
            >
              {titles?.map((element) => (
                <option
                  key={element?.id}
                  value={element?.user_title}
                >
                  {element?.user_title}
                </option>
              ))}
            </select>
          </div>
        ) : (
          ""
        )}
        {currentUser && currentUser?.id ? (
          <button
            onClick={() => setOpen(true)}
            title="Add recommendation"
            className="flex p-0 items-center justify-center text-lg bg-clr_alt text-white rounded-full w-11 h-11"
          >
            <MdOutlineAdd size={20} />
          </button>
        ) : ""}
      </div>
      <div className="grid grid-cols-1 w-full lg:grid-cols-2 xl:grid-cols-4  gap-2 lg:grid-gap-4 xl:gap-6 h-full">
        {filterValue ? recommendations?.filter((element) => element.user_title == filterValue)?.map((item) => (
          <RecommendationCard theme={theme} item={item} key={item._id} colors={colors} />
        )) : (recommendations?.map((item) => (
          <RecommendationCard theme={theme} item={item} key={item._id} colors={colors} />
        )))}
      </div>
      <Modal
        title="Recommend person"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={false}
      >
        <div className="rounded-md p-2 flex-col flex items-start gap-2 md:gap-4 justify-between w-full">
          <div className="rounded-md pb-2 p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full">
            <div>
              <div>
                <input id='name' value={inputData.name} onChange={handleChange} placeholder="Name*" />
              </div>
              <div>
                <input id='second_name' value={inputData.second_name} onChange={handleChange} placeholder="Second name" />
              </div>
              <div>
                <input id='last_name' value={inputData.last_name} onChange={handleChange} placeholder="Last name*" />
              </div>
              <div>
                <input type="email" id='email' value={inputData.email} onChange={handleChange} placeholder="Email*" />
              </div>
              <div>
                <input id='quote' value={inputData.bio} onChange={handleChange} placeholder="Short bio*" />
              </div>
              <div>
                <input id='portfolio' value={inputData.portfolio} onChange={handleChange} placeholder="Website (blog/portfolio) link*" />
              </div>
              <div className="flex items-center p-0 m-0 text-base">
                <p className="p-0 m-0 text-base text-cl_core core ml-5">
                  https://github.com/
                </p>
                <input id='github' value={inputData.github} onChange={handleChange} placeholder="Github username*" />
              </div>
              <div className="flex items-center p-0 m-0 text-base">
                <p className="p-0 m-0 text-base text-bg_core ml-5">
                  https://www.linkedin.com/in/
                </p>
                <input id="linkedin" value={inputData.linkedin} onChange={handleChange} placeholder="Linkedin username*" />
              </div>
              <div>
                <select
                  id='title_id'
                  onChange={(e) => setInputData({ ...inputData, title_id: e.target.value })}
                >
                  {titles?.map((elem) => (
                    <>
                      <option value={elem.id} key={elem.id}>{elem?.user_title}</option>
                    </>
                  ))}
                </select>
              </div>
              <div>
                <select
                  id='country'
                  onChange={(e) => setInputData({ ...inputData, country: e.target.value })}
                >
                  {countries?.map((elem) => (
                    <>
                      <option value={elem.id} key={elem.id}>
                        {elem?.emoji} {elem?.name}{" "}
                      </option>
                    </>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="flex w-full md:w-max h-full flex-col space-y-2 pb-4">
                <div className="flex items-center self-end bg-clr_alt w-max text-white rounded-full gap-2">
                  <div className="space-y-1 py-1 pl-3">
                    <p className="text-xs">
                      {currentUser?.username} {currentUser?.lastname}
                    </p>
                  </div>
                  <div>
                    <img
                      src={currentUser?.profile}
                      alt="cover"
                      className="rounded-full object-cover object-center h-[35px] w-[35px]"
                    />
                  </div>
                </div>
                <div className="p-2">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      acceptedFiles.map((file, index) =>
                      {
                        const { type } = file;
                        if (
                          type === "image/png" ||
                          type === "image/svg" ||
                          type === "image/jpeg" ||
                          type === "image/gif" ||
                          type === "image/webp"
                        )
                        {
                          setInputData({ ...inputData, re_image: file });
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onloadend = () => setInputData({ ...inputData, re_image: file })
                          setImageSrc(reader.result);
                        }
                      })
                    }
                  >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div {...getRootProps()} className="p-[1rem]">
                        <input name="banner" {...getInputProps()} />
                        {isDragActive ? (
                          <div className="flex flex-col text-center items-center justify-center">
                            <p className="text-center text-[13px] text-primary">
                              <MdCloudUpload size={22} />{" "}
                            </p>
                            <p className="text-center text-[13px]">
                              {" "}
                              Drop here!
                            </p>
                          </div>
                        ) : imageSrc === null ? (
                          <div className="flex flex-col text-center items-center justify-center">
                            <p className="text-center text-[13px] text-primary">
                              <MdCloudUpload size={22} />
                            </p>
                            <p className="text-center text-[13px]">
                              Drag and Drop here or click to choose
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <div>
                              <img
                                className="h-[200px] w-[200px] object-cover rounded-md"
                                src={imageSrc}
                                alt=""
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSubmit} className="py-1 px-2 lg:py-2 lg:px-4">Save</button>
        </div>
      </Modal>
      <Modal
        title={`${selectedSuggestion.username} ${selectedSuggestion.lastname}`}
        centered
        open={openSuggestion}
        onOk={() => setOpenSuggestion(false)}
        onCancel={() => setOpenSuggestion(false)}
        width={1000}
        footer={false}
      >
        <Recommendation />
      </Modal>
    </div>
  )
};

export default Recommendations;
