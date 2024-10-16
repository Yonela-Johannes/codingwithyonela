import {
  PiBuildingDuotone,
  PiChatDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";
import { Spinner } from "flowbite-react";
import { AiTwotoneMail } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { apiUrl, formHeaders } from "../constants/base_urls";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";
import { inputClassName, labelClassName } from "../utils/utils";
import { contacts } from "../data/data";
import { Head } from "../shared/Head";

export default function Contact() {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const selectFileRef = useRef(null);

  const [inputData, setInputData] = useState({
    account_id: currentUser?.id || "",
    image: currentUser?.profile || "",
    name: currentUser?.firstname || "",
    last_name: currentUser?.lastname || "",
    email: currentUser?.email || "",
    company: currentUser?.company || "",
  });

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (
      inputData.image &&
      inputData?.name &&
      inputData?.last_name &&
      inputData?.email &&
      inputData?.message
    ) {
      const formData = new FormData();
      formData.append("account_id", currentUser?.id);
      formData.append("name", inputData.name);
      formData.append("lastname", inputData.last_name);
      formData.append("image", inputData.image);
      formData.append("email", inputData.email);
      formData.append("company", inputData.company);
      formData.append("message", inputData.message);

      await axios
        .post(`${apiUrl}contact-us`, formData, {
          headers: formHeaders,
        })
        .then((_) =>
          toast(
            "🔥 Email sent, Thank you! We'll be reviewing your email shortly and will get back to you soon."
          )
        )
        .catch(({ response }) => {
          if (response.status == 500) {
            toast("Something went wrong, please try again later.");
          }
        });

      setInputData({
        account_id: "",
        name: "",
        last_name: "",
        email: "",
        message: "",
        company: "",
      });
      setSelectedFile("");
    } else {
      toast("Missing data. Provide all information");
    }
    setLoading(false);
  };

  const onSelectImage = (event) => {
    setInputData({ ...inputData, image: event.target.files[0] });
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
  return (
    <div
      className={`${
        theme == "light" ? "bg-bg_lightest" : "border-none bg-bg_core"
      } flex flex-col justify-center border lg:items-center w-full`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`${
          theme == "light" ? "bg-bg_lightest" : "border-none bg-bg_core"
        } grid lg:grid-cols-2 justify-start lg:items-start lg:mt-20`}
      >
        <div className="md:px-6 py-6">
        <Head
          title="Contact"
          desc="We're here to collaborate, answer your questions, and explore new
            ideas together. Whether you want to discuss projects, ask for
            support, or just say hello, feel free to reach out—we’d love to hear
            from you!"
          theme={theme}
        />
          <div className="grid grid-cols-3">
            {contacts?.map((contact) => (
              <div className="mt-6 text-start" key={contact.id}>
                <div className="text-xl font-medium mb-2">{contact.title}</div>
                <div className="text-sm">{contact.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${
            theme == "light" ? "bg-white" : "bg-bg_primary"
          } w-full flex lg:px-16 flex-col md:items-center gap-5 py-10 lg:w-[600px]`}
        >
          <p
            className={`${
              theme == "light"
                ? "bg-white"
                : "text-bg_lightest bg-bg_primary border-none"
            } w-full text-lg lg:text-xl text-start`}
          >
            Let's Connect
          </p>
          {loading ? (
            <Loader disable={true} />
          ) : (
            <div className="flex-col flex items-start gap-2 md:gap-4 justify-between w-full">
              <div className="pb-2 lg:grid lg:grid-cols-2 items-start gap-2 md:gap-4 justify-center w-full">
                <div className="flex flex-col gap-2 w-full">
                  <div className="relative flex flex-col justify-between items-center h-[100px]">
                    {currentUser?.profile || selectedFile ? (
                      <>
                        <img
                          className="rounded-full h-[60px] w-[60px] object-cover object-center"
                          src={currentUser?.profile || selectedFile}
                        />
                        {currentUser?.profile ? (
                          ""
                        ) : (
                          <div
                            className={`${
                              theme == "light"
                                ? ""
                                : "text-white border-bg_grey"
                            } absolute flex gap-3 top-1 right-1 `}
                          >
                            <button
                              className="p-2  text-lg lg:text-xl"
                              onClick={() => setSelectedFile("")}
                            >
                              <RiDeleteBin2Line size={24} />
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col w-full  justify-center items-center cursor-pointer my-4">
                        <div
                          className={`text-xl lg:text-4xl  ${
                            theme == "light" ? "text-black" : "text-white"
                          }`}
                          onClick={() => selectFileRef.current?.click()}
                        >
                          <p
                            value="avatar"
                            className={`text-base ${
                              theme == "light" ? "text-black" : "text-white"
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
                              : "bg-white text-bg_grey"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                  <div className="md:flex flex-col gap-4 w-full">
                    <div className="w-full pt-3">
                      <label className={labelClassName(theme)} htmlFor="name">
                        First name
                      </label>
                    </div>
                    <div>
                      <input
                        className={inputClassName(theme)}
                        id="name"
                        value={inputData.name}
                        onChange={!currentUser?.id ? handleChange : ""}
                        placeholder="First name"
                      />
                    </div>
                  </div>
                  <div className="md:flex flex-col gap-4 w-full">
                    <div className="w-full pt-3">
                      <label className={labelClassName(theme)} htmlFor="email">
                        Email
                      </label>
                    </div>
                    <div>
                      <input
                        className={inputClassName(theme)}
                        id="email"
                        value={inputData.email}
                        onChange={!currentUser?.id ? handleChange : ""}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-start w-full">
                  <div className="hidden lg:block lg:h-[100px] mb-2">
                    {currentUser && currentUser?.id ? (
                      ""
                    ) : (
                      <>
                        <p
                          className={`${
                            theme == "light" ? "text-black" : "text-white"
                          } text-base`}
                        >
                          Your details
                        </p>
                        <p
                          className={`${
                            theme == "light" ? "text-black" : "text-white"
                          } my-1 lg:my-2 text-sm`}
                        >
                          If you have an account. <br />
                          We suggest that you sign in.
                        </p>
                      </>
                    )}
                  </div>
                  <div className="md:flex flex-col gap-4 w-full">
                    <div className="w-full pt-3">
                      <label
                        className={labelClassName(theme)}
                        htmlFor="userName"
                      >
                        Last name
                      </label>
                    </div>
                    <div>
                      <input
                        className={inputClassName(theme)}
                        id="last_name"
                        value={inputData.last_name}
                        onChange={!currentUser?.id ? handleChange : ""}
                        placeholder="last name"
                      />
                    </div>
                  </div>
                  <div className="md:flex flex-col gap-4 w-full pt-2">
                    <div className="w-full pt-3">
                      <label
                        className={labelClassName(theme)}
                        htmlFor="company"
                      >
                        Company
                      </label>
                    </div>
                    <div>
                      <input
                        className={inputClassName(theme)}
                        id="company"
                        value={inputData.company}
                        onChange={handleChange}
                        placeholder="Company"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:flex flex-col gap-4 w-full">
                <div className="w-full pt-3">
                  <label className={labelClassName(theme)} htmlFor="userName">
                    Message
                  </label>
                </div>
                <textarea
                  className={inputClassName(theme)}
                  id="message"
                  value={inputData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                />
              </div>
            </div>
          )}
          <button
            className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold ${
              theme == "light"
                ? "bg-cl_primary text-bg_core"
                : "bg-clr_alt text-bg_lightest"
            } disabled:bg-bg_lighter`}
            onClick={handleSubmit}
            disabled={loading || inputData?.message?.length < 5}
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
      </motion.div>
    </div>
  );
}
