import { useDispatch, useSelector } from "react-redux";
import RecommendationCard from "../components/recommendation/RecommendationCard";
import { useContext, useEffect, useRef, useState } from "react";
import { getAllTitles } from "../features/title/titleSlice";
import { MdClose, MdOutlineAdd } from "react-icons/md";
import { Modal } from "antd";
import { createRecommendation, disableRecommendationUpdates, getAllRecommendations } from "../features/recommenation/recommendationSlice";
import { getAllCountries } from "../features/countries/countrySlice";
import toast from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";
import Recommendation from "./Recommendation";
import { ModalContext } from "../context/ModalContext";
import { AiTwotoneFileImage } from "react-icons/ai";

const Recommendations = () =>
{
  const { openSuggestion, setOpenSuggestion, selectedSuggestion } = useContext(ModalContext)
  const { theme } = useContext(ThemeContext)
  const { currentUser, } = useSelector((state) => state?.user);
  const { countries } = useSelector((state) => state.countries);
  const [filterValue, setFilterValue] = useState("")
  const { recommendations, created, updated } = useSelector((state) => state.recommendation);
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

  useEffect(() =>
  {
    if (recommendations?.length)
    {
      dispatch(getAllTitles());
    }
  }, [recommendations]);

  useEffect(() =>
  {
    if (open)
    {
      dispatch(getAllCountries());
    }
  }, [open]);

  const fetchRecommendations = () =>
  {
    dispatch(getAllRecommendations());
    dispatch(disableRecommendationUpdates())
  }

  useEffect(() =>
  {
    if (titles)
    {
      fetchRecommendations()
    }
  }, [titles]);

  // useEffect(() =>
  // {
  //   if (created || updated)
  //   {
  //     fetchRecommendations()
  //   }
  // }, [created, updated]);


  const handleChange = (e) =>
  {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () =>
  {
    if (currentUser || inputData.sender_email !== '' && inputData.sender_name !== '' && inputData.sender_lastname !== '')
    {
      if (inputData?.name && inputData?.last_name && inputData?.email && inputData?.portfolio && inputData?.github && inputData?.linkedin && inputData?.profession && inputData?.country)
      {
        const formData = new FormData();
        formData.append('account_id', currentUser?.id);
        formData.append('name', inputData.name);
        formData.append('lastname', inputData.last_name);
        formData.append('github', inputData.github);
        formData.append('linkedin', inputData.linkedin);
        formData.append('email', inputData.email);
        formData.append('portfolio', inputData.portfolio);
        formData.append('website', inputData.website);
        formData.append('profession', inputData.profession);
        formData.append('country_id', inputData.country);
        formData.append('sender_email', inputData.sender_email);
        formData.append('sender_name', inputData.sender_name);
        formData.append('sender_lastname', inputData.sender_lastname);

        dispatch(createRecommendation(formData))
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
        })
        setSelectedFile('')
      } else
      {
        toast("Missing data. Provide all information")
      }
    } else
    {
      toast("Signin or enter you details")
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

  const onSelectImage = (event) =>
  {
    setInputData({ ...inputData, portfolio: event.target.files[0] });
    const reader = new FileReader();
    if (event.target.files?.[0])
    {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) =>
    {
      if (readerEvent.target?.result)
      {
        setSelectedFile(readerEvent.target?.result);
      }
    };
  };

  const handleFilter = (e) =>
  {
    setFilterValue(e.target.value)
  }

  return (
    <div className="h-full my-5">
      <div className="hidden lg:flex gap-2 items-start w-full mb-8 justify-between">
        {titles && titles?.length > 0 ? (
          <div className="grid grid-cols-1 w-max gap-2">
            <select onChange={handleFilter}
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-bg_light" : "bg-bg_grey text-white"} rounded-md`}
            >
              <>
                <option value="" disabled selected hidden>Select profession</option>
                <option value="all">All professions</option>
                {titles?.map((element) => (
                  <>
                    <option
                      key={element?.id}
                      value={element?.user_title}
                    >
                      {element?.user_title}
                    </option>
                  </>
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
          className="flex p-0 items-center justify-center text-lg bg-clr_alt text-white rounded-full w-11 h-11"
        >
          <MdOutlineAdd size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 w-full lg:grid-cols-2 xl:grid-cols-4  gap-2 lg:grid-gap-4 xl:gap-6 h-full">
        {filterValue && filterValue !== 'all' ? recommendations?.filter((element) => element.user_title == filterValue)?.map((item) => (
          item?.status !== 'pending' ? (
            <RecommendationCard theme={theme} item={item} key={item._id} />
          ) : ''
        )) : (currentUser?.is_admin || currentUser?.is_staff) ? (recommendations?.map((item) => (
          <RecommendationCard theme={theme} item={item} key={item._id} />
        ))) : (recommendations?.map((item) => (
          item?.status !== 'pending' ?
            (<RecommendationCard theme={theme} item={item} key={item._id} />) : ""
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
          <div className="rounded-md pb-2 p-2 grid lg:grid-cols-2 items-start gap-2 md:gap-4 justify-center w-full">
            <div>
              <p className="lg:text-lg text-bg_primary font-semibold">Developer</p>
              <div className="flex flex-col gap-2">
                <div
                  className="relative flex flex-col justify-between items-center"
                >
                  {selectedFile ? (
                    <>
                      <img
                        className="w-full max-h-[200px] object-cover object-center"
                        src={selectedFile}
                      />
                      <div className="absolute flex gap-3 top-1 right-1 bg-clr_alt rounded-full border-bg_grey">
                        <button
                          className="p-2 rounded-full text-lg lg:text-xl"
                          onClick={() => setSelectedFile("")}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div
                      className="flex flex-col w-full rounded-md justify-center items-center cursor-pointer my-4"
                    >
                      <div
                        className={`text-xl lg:text-4xl px-3 py-2 mt-1 ${theme == "light" ? "text-black" : "bg-bg_card"} p-2 lg:px-4 lg:py-2`}
                        onClick={() => selectFileRef.current?.click()}
                      >
                        <AiTwotoneFileImage />
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                        hidden
                        ref={selectFileRef}
                        onChange={onSelectImage}
                        className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
                      />
                    </div>
                  )
                  }
                </div>
                <div>
                  <input className="rounded-none bg-bg_lightest" id='name' value={inputData.name} onChange={handleChange} placeholder="name" />
                </div>
                <div>
                  <input className="rounded-none bg-bg_lightest" id='last_name' value={inputData.last_name} onChange={handleChange} placeholder="last name" />
                </div>
                <div>
                  <input className="rounded-none bg-bg_lightest" id='email' value={inputData.email} onChange={handleChange} placeholder="email" />
                </div>
                <div className="flex items-center p-0 m-0 text-base">
                  <input className="rounded-none bg-bg_lightest" id='github' value={inputData.github} onChange={handleChange} placeholder="github username" />
                </div>
                <div className="flex items-center p-0 m-0 text-base">
                  <input className="rounded-none bg-bg_lightest" id="linkedin" value={inputData.linkedin} onChange={handleChange} placeholder="linkedin username" />
                </div>
                <div className="flex items-center p-0 m-0 text-base">
                  <input className="rounded-none bg-bg_lightest" id='website' value={inputData.website} onChange={handleChange} placeholder="website" />
                </div>
                <div>
                  <select
                    className="w-full rounded-none bg-bg_lightest"
                    id='profession'
                    onChange={(e) => setInputData({ ...inputData, profession: e.target.value })}
                  >
                    {titles?.map((elem) => (
                      <>
                        <option value="" disabled selected hidden>Select profession</option>
                        <option value={elem.id} key={elem.id}>{elem?.user_title}</option>
                      </>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    id='country'
                    className="w-full rounded-none bg-bg_lightest"
                    onChange={(e) => setInputData({ ...inputData, country: e.target.value })}
                  >
                    {countries?.map((elem) => (
                      <>
                        <option value="" disabled selected hidden>Select country</option>
                        <option value={elem.id} key={elem.id}>
                          {elem?.emoji} {elem?.name}{" "}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full">
              <p className="lg:text-lg text-bg_primary font-semibold">Your details</p>
              <div className="flex w-full h-full flex-col space-y-2 pb-4">
                {currentUser && currentUser?.id ? (
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
                ) : (
                  <div className="w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="w-full">
                        <input className="rounded-none bg-bg_lightest w-full" id='sender_name' value={inputData.sender_name} onChange={handleChange} placeholder="name" />
                      </div>
                      <div className="w-full">
                        <input className="rounded-none bg-bg_lightest w-full" id='sender_lastname' value={inputData.send_lastname} onChange={handleChange} placeholder="last name" />
                      </div>
                      <div className="w-full">
                        <input className="rounded-none bg-bg_lightest w-full" id='sender_email' value={inputData.sender_email} onChange={handleChange} placeholder="last name" />
                      </div>
                    </div>
                  </div>
                )}
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
