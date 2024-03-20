import { useDispatch, useSelector } from "react-redux";
import RecommendationCard from "../components/recommendation/RecommendationCard";
import { Watermark } from "antd";
import { useEffect, useState } from "react";
import { getAllTitles } from "../features/title/titleSlice";
import { MdOutlineAdd } from "react-icons/md";
import { Modal } from "antd";
import { MdCloudUpload } from "react-icons/md";
import Dropzone from "react-dropzone";
import { getAllCountries } from "../features/countries/countrySlice";
import { getAllRecommendations } from "../features/recommenation/recommendationSlice";

const Recommendations = () => {
  const { user } = useSelector((state) => state.user);
  const { countries } = useSelector((state) => state.countries);
  const { recommendations } = useSelector((state) => state.recommendation);
  const [imageSrc, setImageSrc] = useState(null);
  const [open, setOpen] = useState(false);
  const { titles } = useSelector((state) => state.titles);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    errors: "",
    account_id: "",
    name: "",
    second_name: "",
    last_name: "",
    email: "",
    bio: "",
    portfolio: "",
    github: "",
    linkedin: "",
    title_id: "",
    country: "",
  });

  useEffect(() => {
    dispatch(getAllTitles());
    // dispatch(getAllCountries());
  }, []);

  useEffect(() => {
    dispatch(getAllRecommendations());
  }, []);

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

  return (
    <div className="h-full my-5">
      <div className="flex items-start w-full mb-8 justify-between">
        {titles && titles?.length > 0 ? (
          <div className="grid grid-cols-1 w-max gap-2">
            <select>
              {titles?.map((element) => (
                <option
                  key={element?.id}
                  className="flex items-center cursor-pointer gap-4 rounded-none border-none border-b border-bg_core drop-shadow-none w-full"
                >
                  {element?.user_title}
                </option>
              ))}
            </select>
          </div>
        ) : (
          ""
        )}
        {user && user?.id ? (
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
        {recommendations?.map((item) => (
          <RecommendationCard item={item} key={item._id} colors={colors} />
        ))}
      </div>
      <>
        <Modal
          title="Recommend"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <div className="rounded-md p-2 flex-col flex items-start gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core duration-200 cursor-pointer">
            <div className="rounded-md pb-2 p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer">
              <div>
                <div>
                  <input placeholder="Name*" />
                </div>
                <div>
                  <input placeholder="Second name" />
                </div>
                <div>
                  <input placeholder="Last name*" />
                </div>
                <div>
                  <input placeholder="Email*" />
                </div>
                <div>
                  <textarea placeholder="Short bio*"></textarea>
                </div>
                <div>
                  <input placeholder="Website (portfolio)*" />
                </div>
                <div className="flex items-center p-0 m-0 text-base">
                  <p className="p-0 m-0 text-base text-cl_core core ml-5">
                    https://github.com/
                  </p>
                  <input placeholder="Github username*" />
                </div>
                <div className="flex items-center p-0 m-0 text-base">
                  <p className="p-0 m-0 text-base text-bg_core ml-5">
                    https://www.linkedin.com/in/
                  </p>
                  <input placeholder="Linkedin username*" />
                </div>
                <div>
                  <select>
                    {titles?.map((elem) => (
                      <>
                        <option key={elem.id}>{elem?.user_title}</option>
                      </>
                    ))}
                  </select>
                </div>
                <div>
                  <select>
                    {countries?.map((elem) => (
                      <>
                        <option key={elem.id}>
                          {elem?.emoji} {elem?.name}{" "}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="flex w-full md:w-max h-full flex-col space-y-2 pb-4">
                  <div className="flex items-center bg-clr_alt text-white rounded-full md:justify-between gap-2">
                    <div className="space-y-1py-1 pl-3">
                      <p className="text-xs">
                        {user?.username} {user?.lastname}
                      </p>
                    </div>
                    <div>
                      <img
                        src={user?.profile}
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
                        acceptedFiles.map((file, index) => {
                          const { type } = file;
                          if (
                            type === "image/png" ||
                            type === "image/svg" ||
                            type === "image/jpeg" ||
                            type === "image/gif" ||
                            type === "image/webp"
                          ) {
                            setInputData({ ...inputData, image: file });
                            console.log(typeof inputData.image);
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend = () => {
                              setImageSrc(reader.result);
                            };
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
            <button>Save</button>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default Recommendations;
