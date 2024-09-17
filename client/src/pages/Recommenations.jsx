import { useDispatch, useSelector } from "react-redux";
import RecommendationCard from "../components/recommendation/RecommendationCard";
import { useContext, useEffect, useRef, useState } from "react";
import { getAllTitles } from "../features/title/titleSlice";
import { MdOutlineAdd } from "react-icons/md";
import { Modal } from "antd";
import { Spinner } from "flowbite-react";
import {
  createRecommendation,
  disableRecommendationUpdates,
  getAllRecommendations,
} from "../features/recommenation/recommendationSlice";
import { getAllCountries } from "../features/countries/countrySlice";
import toast from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";
import Recommendation from "./Recommendation";
import { ModalContext } from "../context/ModalContext";
import { RiDeleteBin2Line } from "react-icons/ri";
import Loader from "../shared/Loader";
import { motion } from "framer-motion";
import {
  PiBuildingApartmentDuotone,
  PiFlagDuotone,
  PiGithubLogoDuotone,
  PiLinkedinLogoDuotone,
  PiShareDuotone,
  PiUserCircleDashedDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";
import { AiTwotoneMail } from "react-icons/ai";
import { Head } from "../shared/Head";
import { LayoutContext } from "../context/LayoutContext";
import ListCard from "../components/recommendation/ListCard";

const Recommendations = () => {
  const { openSuggestion, setOpenSuggestion, selectedSuggestion } =
    useContext(ModalContext);
  const { layout } = useContext(LayoutContext);
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useSelector((state) => state?.user);
  const { countries } = useSelector((state) => state.countries);
  const [filterValue, setFilterValue] = useState("");
  const { recommendations, created, fetched, loading } = useSelector(
    (state) => state.recommendation
  );
  const [selectedFile, setSelectedFile] = useState();
  const selectFileRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { titles } = useSelector((state) => state.titles);
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({
    account_id: "",
    name: "",
    last_name: "",
    email: "",
    portfolio: "",
    website: "",
    github: "",
    linkedin: "",
    profession: "",
    country: "",
    sender_email: "",
    sender_name: "",
    sender_lastname: "",
  });

  useEffect(() => {
    if (fetched) {
      dispatch(getAllTitles());
      dispatch(disableRecommendationUpdates());
    }
  }, [fetched]);

  useEffect(() => {
    if (open) {
      dispatch(getAllCountries());
    }
  }, [open]);

  const fetchRecommendations = () => {
    dispatch(getAllRecommendations());
    dispatch(disableRecommendationUpdates());
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  useEffect(() => {
    if (created) {
      setOpen(false);
      fetchRecommendations();
      toast("Thank you for your recommendation. Check your email");
    }
  }, [created]);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      currentUser ||
      (inputData.sender_email !== "" &&
        inputData.sender_name !== "" &&
        inputData.sender_lastname !== "")
    ) {
      if (
        inputData?.name &&
        inputData?.last_name &&
        inputData?.email &&
        inputData?.portfolio &&
        inputData?.github &&
        inputData?.linkedin &&
        inputData?.profession &&
        inputData?.country
      ) {
        const formData = new FormData();
        formData.append("account_id", currentUser?.id);
        formData.append("name", inputData.name);
        formData.append("lastname", inputData.last_name);
        formData.append("github", inputData.github);
        formData.append("linkedin", inputData.linkedin);
        formData.append("email", inputData.email);
        formData.append("portfolio", inputData.portfolio);
        formData.append("website", inputData.website);
        formData.append("profession", inputData.profession);
        formData.append("country_id", inputData.country);
        formData.append("sender_email", inputData.sender_email);
        formData.append("sender_name", inputData.sender_name);
        formData.append("sender_lastname", inputData.sender_lastname);

        dispatch(createRecommendation(formData));
        setInputData({
          account_id: "",
          name: "",
          last_name: "",
          email: "",
          quote: "",
          portfolio: "",
          website: "",
          github: "",
          linkedin: "",
          profession: "",
          country: "",
          sender_email: "",
          sender_name: "",
          sender_lastname: "",
        });
        setSelectedFile("");
      } else {
        toast("Missing data. Provide all information");
      }
    } else {
      toast("Signin or enter you details");
    }
  };

  useEffect(() => {
    if (created) {
      setOpen(false);
      dispatch(disableRecommendationUpdates());
    }
  }, [created]);

  const onSelectImage = (event) => {
    setInputData({ ...inputData, portfolio: event.target.files[0] });
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result);
      }
    };
  };

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full my-5"
    >
      <div className="space-y-4 max-w-[550px] mb-8">
        <Head
          title="Recommendations"
          desc="Check out valuable recommendations from the community, offering tools, insights, and advice to enhance your work."
          theme={theme}
        />
      </div>
      <div className="hidden lg:flex gap-2 items-start w-full mb-8 justify-between">
        {titles && titles?.length > 0 ? (
          <div className="grid grid-cols-1 w-max gap-2">
            <select
              onChange={handleFilter}
              className={`w-full px-3 py-2 mt-1 border ${
                theme == "light"
                  ? "text-black bg-bg_light"
                  : "bg-bg_grey text-bg_lightest"
              } `}
            >
              <>
                <option value="" disabled defaultValue hidden>
                  Select profession
                </option>
                <option value="all">All professions</option>
                {titles?.map((element) => (
                  <option key={element?.id} value={element?.user_title}>
                    {element?.user_title}
                  </option>
                ))}
              </>
            </select>
          </div>
        ) : (
          ""
        )}
        <button
          onClick={() => setOpen(true)}
          title="Add recommendation"
          className={` ${
            theme == "light"
              ? "text-black bg-bg_light"
              : "bg-bg_grey text-bg_lightest"
          } flex p-0 items-center justify-center text-base  border-none`}
        >
          <p className="pl-2">Recommend</p>
          <div
            className={` ${
              theme == "light"
                ? "text-black bg-bg_light"
                : "bg-bg_grey text-bg_lightest"
            } flex p-0 items-center justify-center text-lg  w-10 h-10`}
          >
            <MdOutlineAdd size={20} />
          </div>
        </button>
      </div>
      {layout == "grid" ? (
        <div className="grid grid-cols-1 w-full lg:grid-cols-2 xl:grid-cols-4 gap-2 lg:grid-gap-4 xl:gap-6 h-full">
          {filterValue && filterValue !== "all"
            ? recommendations
                ?.filter((element) => element.user_title == filterValue)
                ?.map((item, x) =>
                  item?.status !== "pending" ? (
                    <RecommendationCard key={x} theme={theme} item={item} />
                  ) : (
                    ""
                  )
                )
            : currentUser?.is_admin || currentUser?.is_staff
            ? recommendations?.map((item) => (
                <RecommendationCard theme={theme} item={item} key={item?._id} />
              ))
            : recommendations?.map((item, x) =>
                item?.status !== "pending" ? (
                  <RecommendationCard theme={theme} item={item} key={x} />
                ) : (
                  ""
                )
              )}
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {filterValue && filterValue !== "all"
            ? recommendations
                ?.filter((element) => element.user_title == filterValue)
                ?.map((item) => (
                  item?.status !== "pending" ? (<ListCard key={item?.id} item={item} />) : ""))
            : recommendations?.map((item) => (
              item?.status !== "pending" ? (<ListCard key={item?.id} item={item} />) : ""
              ))}
        </div>
      )}

      <Modal
        title="Recommended developer details"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={800}
        footer={false}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="p-2 flex-col flex items-start gap-2 md:gap-4 justify-between w-full">
            <div className=" pb-2 p-2 grid lg:grid-cols-2 items-start gap-2 md:gap-4 justify-center w-full">
              <div>
                <div className="flex flex-col gap-2">
                  <div className="relative flex flex-col justify-between items-center  h-[100px]">
                    {selectedFile ? (
                      <>
                        <img
                          className="w-full  max-h-[100px] max-w-[100px] object-cover object-center"
                          src={selectedFile}
                        />
                        <div
                          className={`${
                            theme == "light" ? "" : "text-white border-bg_grey"
                          } absolute flex gap-3 top-1 right-1 `}
                        >
                          <button
                            className="p-2  text-lg lg:text-xl"
                            onClick={() => setSelectedFile("")}
                          >
                            <RiDeleteBin2Line size={24} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col w-full  justify-center items-center cursor-pointer my-4">
                        <div
                          className={`text-xl lg:text-4xl  ${
                            theme == "light" ? "text-black" : "bg-bg_card"
                          }`}
                          onClick={() => selectFileRef.current?.click()}
                        >
                          <p
                            value="email"
                            className={`text-base ${
                              theme == "light"
                                ? "text-black"
                                : "bg-bg_card text-bg_grey"
                            }`}
                          >
                            Avatar
                          </p>
                          <PiUserCircleDuotone />
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/x-png,image/jpeg"
                          hidden
                          ref={selectFileRef}
                          onChange={onSelectImage}
                          className={`w-full px-3 border ${
                            theme == "light"
                              ? "text-black bg-gray-200"
                              : "bg-bg_card text-bg_grey"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex items-center w-full border ${
                      theme == "light"
                        ? "text-black bg-gray-200"
                        : "bg-bg_card text-bg_grey"
                    }`}
                  >
                    <PiUserCircleDuotone size={24} />
                    <input
                      className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                        theme == "light"
                          ? "text-black bg-gray-200"
                          : "bg-bg_card text-bg_grey"
                      }`}
                      id="name"
                      value={inputData.name}
                      onChange={handleChange}
                      placeholder="First name"
                    />
                  </div>
                  <div
                    className={`flex items-center w-full border ${
                      theme == "light"
                        ? "text-black bg-gray-200"
                        : "bg-bg_card text-bg_grey"
                    }`}
                  >
                    <PiUserCircleDuotone size={24} />
                    <input
                      className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                        theme == "light"
                          ? "text-black bg-gray-200"
                          : "bg-bg_card text-bg_grey"
                      }`}
                      id="last_name"
                      value={inputData.last_name}
                      onChange={handleChange}
                      placeholder="last name"
                    />
                  </div>
                  <div
                    className={`flex items-center w-full border ${
                      theme == "light"
                        ? "text-black bg-gray-200"
                        : "bg-bg_card text-bg_grey"
                    }`}
                  >
                    <AiTwotoneMail size={24} />
                    <input
                      className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                        theme == "light"
                          ? "text-black bg-gray-200"
                          : "bg-bg_card text-bg_grey"
                      }`}
                      id="email"
                      value={inputData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                  <div
                    className={`flex items-center w-full border ${
                      theme == "light"
                        ? "text-black bg-gray-200"
                        : "bg-bg_card text-bg_grey"
                    }`}
                  >
                    <PiGithubLogoDuotone size={24} />
                    <input
                      className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                        theme == "light"
                          ? "text-black bg-gray-200"
                          : "bg-bg_card text-bg_grey"
                      }`}
                      id="github"
                      value={inputData.github}
                      onChange={handleChange}
                      placeholder="Github username"
                    />
                  </div>
                  <div
                    className={`flex items-center w-full border ${
                      theme == "light"
                        ? "text-black bg-gray-200"
                        : "bg-bg_card text-bg_grey"
                    }`}
                  >
                    <PiLinkedinLogoDuotone size={24} />
                    <input
                      className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                        theme == "light"
                          ? "text-black bg-gray-200"
                          : "bg-bg_card text-bg_grey"
                      }`}
                      id="linkedin"
                      value={inputData.linkedin}
                      onChange={handleChange}
                      placeholder="LinkedIn username"
                    />
                  </div>
                  <div
                    className={`flex items-center w-full border ${
                      theme == "light"
                        ? "text-black bg-gray-200"
                        : "bg-bg_card text-bg_grey"
                    }`}
                  >
                    <PiShareDuotone size={24} />
                    <input
                      className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                        theme == "light"
                          ? "text-black bg-gray-200"
                          : "bg-bg_card text-bg_grey"
                      }`}
                      name="link"
                      id="website"
                      value={inputData.website}
                      onChange={handleChange}
                      placeholder="Website/Blog"
                    />
                  </div>
                  <div
                    className={`flex items-center w-full border ${
                      theme == "light"
                        ? "text-black bg-gray-200"
                        : "bg-bg_card text-bg_grey"
                    }`}
                  >
                    <PiBuildingApartmentDuotone size={24} />
                    <select
                      className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                        theme == "light"
                          ? "text-black bg-gray-200"
                          : "bg-bg_card text-bg_grey"
                      }`}
                      id="profession"
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          profession: e.target.value,
                        })
                      }
                    >
                      {titles?.map((elem) => (
                        <>
                          <option
                            key={elem?.id}
                            value=""
                            disabled
                            selected
                            hidden
                          >
                            Select profession
                          </option>
                          <option value={elem.id}>{elem?.user_title}</option>
                        </>
                      ))}
                    </select>
                  </div>
                  <div
                    className={`flex items-center w-full border ${
                      theme == "light"
                        ? "text-black bg-gray-200"
                        : "bg-bg_card text-bg_grey"
                    }`}
                  >
                    <PiFlagDuotone size={24} />
                    <select
                      id="country"
                      className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                        theme == "light"
                          ? "text-black bg-gray-200"
                          : "bg-bg_card text-bg_grey"
                      }`}
                      onChange={(e) =>
                        setInputData({ ...inputData, country: e.target.value })
                      }
                    >
                      {countries?.map((elem) => (
                        <>
                          <option value="" disabled selected hidden>
                            Select country
                          </option>
                          <option value={elem.id} key={elem?.id}>
                            {elem?.emoji} {elem?.name}{" "}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start w-full">
                <div className="lg:h-[100px] mb-2">
                  {currentUser && currentUser?.id ? (
                    ""
                  ) : (
                    <>
                      <p className="text-base text-bg_primary font-semibold">
                        Your details
                      </p>
                      <p className="my-1 lg:my-2 text-[#646464] text-sm">
                        If you are a developer and you are recommending
                        yourself. We suggest that you sign up.
                      </p>
                    </>
                  )}
                </div>
                <div className="flex w-full flex-col space-y-2 items-end">
                  {currentUser && currentUser?.id ? (
                    <div className="flex w-full items-center md:w-max h-full space-y-2">
                      <div
                        className={` ${
                          theme == "light"
                            ? "text-black bg-bg_light"
                            : "bg-bg_grey text-bg_lightest"
                        } flex p-0 items-center justify-center text-base  md:justify-between gap-2`}
                      >
                        <div className="space-y-1py-1 pl-3">
                          <p className="text-sm lg:text-base">
                            {currentUser?.firstname} {currentUser?.lastname}
                          </p>
                        </div>
                        <div>
                          <img
                            src={currentUser?.profile}
                            alt="cover"
                            className=" object-cover object-center h-[40px] w-[40px]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <div
                          className={`flex items-center w-full border ${
                            theme == "light"
                              ? "text-black bg-gray-200"
                              : "bg-bg_card text-bg_grey"
                          }`}
                        >
                          <PiUserCircleDashedDuotone size={24} />
                          <input
                            className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                              theme == "light"
                                ? "text-black bg-gray-200"
                                : "bg-bg_card text-bg_grey"
                            }`}
                            id="sender_name"
                            value={inputData.sender_name}
                            onChange={handleChange}
                            placeholder="First name"
                          />
                        </div>
                        <div
                          className={`flex items-center w-full border ${
                            theme == "light"
                              ? "text-black bg-gray-200"
                              : "bg-bg_card text-bg_grey"
                          }`}
                        >
                          <PiUserCircleDuotone size={24} />
                          <input
                            className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                              theme == "light"
                                ? "text-black bg-gray-200"
                                : "bg-bg_card text-bg_grey"
                            }`}
                            id="sender_lastname"
                            value={inputData.sender_lastname}
                            onChange={handleChange}
                            placeholder="Last name"
                          />
                        </div>
                        <div
                          className={`flex items-center w-full border ${
                            theme == "light"
                              ? "text-black bg-gray-200"
                              : "bg-bg_card text-bg_grey"
                          }`}
                        >
                          <AiTwotoneMail size={24} />
                          <input
                            className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                              theme == "light"
                                ? "text-black bg-gray-200"
                                : "bg-bg_card text-bg_grey"
                            }`}
                            id="sender_email"
                            value={inputData.sender_email}
                            onChange={handleChange}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold ${
                theme == "light"
                  ? "bg-cl_primary text-bg_core"
                  : "bg-clr_alt text-bg_lightest"
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Send"
              )}
            </button>
          </div>
        )}
      </Modal>
      <Modal
        title={`${selectedSuggestion.username} ${selectedSuggestion.lastname}`}
        centered
        open={openSuggestion}
        onOk={() => setOpenSuggestion(false)}
        onCancel={() => setOpenSuggestion(false)}
        width={600}
        footer={false}
      >
        <Recommendation />
      </Modal>
    </motion.div>
  );
};

export default Recommendations;
