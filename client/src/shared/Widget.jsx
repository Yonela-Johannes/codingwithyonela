import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "../components/widget/input";
import { Textarea } from "../components/widget/textarea";
import { Spinner } from "flowbite-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/widget/popover";
import tailwindStyles from "../index.css?inline";
import { createFeedback } from "../features/feedback/feedbackSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";
import Loader from "./Loader";
import { PiUserCircleDuotone } from "react-icons/pi";
import { AiTwotoneMessage } from "react-icons/ai";

export const Widget = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useSelector((state) => state.user);
  const { created, loading } = useSelector((state) => state.feedback);
  const [selectedFile, setSelectedFile] = useState();
  const [submitted, setSubmitted] = useState(false);
  const selectFileRef = useRef(null);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    account: currentUser ? currentUser?.id : "",
    image: currentUser ? currentUser?.profile : "",
    name: currentUser ? currentUser?.firstname : "",
    lastname: currentUser ? currentUser?.lastname : "",
    email: currentUser ? currentUser?.email : "",
    company: "",
    feedback: "",
    rating: 0,
  });

  useEffect(() => {
    if (created) {
      setSubmitted(false);
      setSelectedFile();
      setFormData({
        account: currentUser?.id ? currentUser?.id : "",
        image: currentUser?.id ? currentUser?.profile : "",
        name: currentUser?.id ? currentUser?.firstname : "",
        lastname: currentUser?.id ? currentUser?.lastname : "",
        email: currentUser?.id ? currentUser?.email : "",
        company: "",
        feedback: "",
        rating: 3,
      });
    }
  }, [created]);

  const onSelectStar = (index) => {
    setFormData({ ...formData, rating: index + 1 });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastname ||
      !formData.email ||
      !formData.feedback ||
      !formData.rating ||
      !formData.image
    )
      return toast("Please enter all fields");
    const newFormData = new FormData();
    newFormData.append("account", formData.account);
    newFormData.append("name", formData.name);
    newFormData.append("lastname", formData.lastname);
    newFormData.append("company", formData.company);
    newFormData.append("email", formData.email);
    newFormData.append("image", formData.image);
    newFormData.append("feedback", formData.feedback);
    newFormData.append("rating", formData.rating);
    setSubmitted(true);
    dispatch(createFeedback(newFormData));
  };

  if (submitted) {
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  }
  const onSelectImage = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
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
    <>
      <style>{tailwindStyles}</style>
      <div className={`widget fixed bottom-4 right-4 z-50`}>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={`  ${
                theme == "light"
                  ? "bg-bg_lightest"
                  : "bg-bg_primary text-bg_lightest border-bg_grey"
              } shadow-lg hover:scale-105`}
            >
              <AiTwotoneMessage size={24} className="mr-2" />
              Feedback
            </button>
          </PopoverTrigger>
          <PopoverContent className="widget rounded-lg bg-card p-4 shadpw-lg w-full max-w-md">
            <style>{tailwindStyles}</style>
            {submitted ? (
              <div>
                <h3 className="text-lg font-bold">
                  Thank you for your feedback!
                </h3>
                <p className="mt-4">
                  We appreciate your feedback. It helps us improve and provide
                  better service to you.
                </p>
              </div>
            ) : loading ? (
              <div className="w-[200px] h-[220px]">
                <Loader />
              </div>
            ) : (
              <div
                className={`${
                  theme == "light" ? "bg-bg_lightest" : "bg-bg_core"
                } p-2`}
              >
                <h3
                  className={`${
                    theme !== "light" ? "text-bg_lightest" : "text-bg_core"
                  } text-lg`}
                >
                  Send us your feedback
                </h3>
                <form className="space-y-2" onSubmit={submit}>
                  <div>
                    <div className="relative flex flex-col justify-between items-center">
                      {selectedFile || !formData?.image == "" ? (
                        <>
                          <img
                            className="w-full rounded-full max-h-[160px] max-w-[160px] object-cover"
                            src={
                              selectedFile
                                ? selectedFile
                                : currentUser?.id
                                ? formData?.image
                                : selectedFile
                            }
                          />
                        </>
                      ) : (
                        <div className="flex flex-col w-full rounded-md justify-center items-center cursor-pointer my-4">
                          <div
                            className={`text-xl lg:text-4xl  ${
                              theme == "light" ? "text-black" : "bg-bg_core"
                            }`}
                            onClick={() => selectFileRef.current?.click()}
                          >
                            <p
                              value="email"
                              className={`text-base ${
                                theme == "light"
                                  ? "text-black"
                                  : "bg-bg_core text-bg_core placeholder-slate-300"
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
                                : "bg-bg_core text-bg_core placeholder-slate-300"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        className={`${
                          theme !== "light"
                            ? "text-bg_lightest"
                            : "text-bg_core"
                        }`}
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <Input
                        value={formData.name}
                        id="name"
                        type="text"
                        handleChange={handleChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className={`${
                          theme !== "light"
                            ? "text-bg_lightest"
                            : "text-bg_core"
                        }`}
                        htmlFor="name"
                      >
                        Last name
                      </label>
                      <Input
                        value={formData.lastname}
                        id="lastname"
                        type='text'
                        handleChange={handleChange}
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className={`${
                          theme !== "light"
                            ? "text-bg_lightest"
                            : "text-bg_core"
                        }`}
                        htmlFor="company"
                      >
                        Company
                      </label>
                      <Input
                      type="text"
                        value={formData.company}
                        id="company"
                        handleChange={handleChange}
                        placeholder="Enter your work"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className={`${
                          theme !== "light"
                            ? "text-bg_lightest"
                            : "text-bg_core"
                        }`}
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Input
                        value={formData.email}
                        id="email"
                        type="email"
                        handleChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      className={`${
                        theme !== "light" ? "text-bg_lightest" : "text-bg_core"
                      }`}
                      htmlFor="feedback"
                    >
                      Feedback
                    </label>
                    <Textarea
                      value={formData.feedback}
                      id="feedback"
                      handleChange={handleChange}
                      placeholder="Tell us what you think"
                      className="min-h-[70px]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`h-5 w-5 cursor-pointer ${
                            formData?.rating > index
                              ? "fill-clr_alt text-clr_alt"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                          onClick={() => onSelectStar(index)}
                        />
                      ))}
                    </div>
                    <button
                      className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold text-bg_core placeholder-slate-300 ${
                        theme == "light" ? "bg-clr_alt" : "bg-clr_alt"
                      }`}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" />
                          <span className="pl-3">Loading...</span>
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-message-circle"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
