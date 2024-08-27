import { useContext, useRef, useState } from "react";
import { Input } from "../components/widget/input";
import { Textarea } from "../components/widget/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../components/widget/popover";
import tailwindStyles from "../index.css?inline";
import { createFeedback } from "../features/feedback/feedbackSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AiTwotoneFileImage } from "react-icons/ai";
import { ThemeContext } from "../context/ThemeContext";
import { MdClose } from "react-icons/md";

export const Widget = () =>
{
  const { theme } = useContext(ThemeContext)
  const { currentUser } = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState();
  const selectFileRef = useRef(null);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    "account": currentUser ? currentUser?.id : '',
    "image": currentUser ? currentUser?.profile : "",
    "name": currentUser ? currentUser?.firstname : "",
    "lastname": currentUser ? currentUser?.lastname : "",
    "email": currentUser ? currentUser?.email : "",
    "company": "",
    "feedback": "",
    "rating": 3
  });

  const [submitted, setSubmitted] = useState(false);

  const onSelectStar = (index) =>
  {
    setFormData({ ...formData, rating: (index + 1) });
  };

  const handleChange = (e) =>
  {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submit = async (e) =>
  {
    e.preventDefault();
    if (!formData.name || !formData.lastname || !formData.email || !formData.feedback || !formData.rating || !formData.image) return toast('Please enter all fields')
    const newFormData = new FormData();
    newFormData.append('account', formData.account);
    newFormData.append('name', formData.name);
    newFormData.append('lastname', formData.lastname);
    newFormData.append('company', formData.company);
    newFormData.append('email', formData.email);
    newFormData.append('image', formData.image);
    newFormData.append('feedback', formData.feedback);
    newFormData.append('rating', formData.rating);

    dispatch(createFeedback(newFormData))
    setSubmitted(true)
    selectedFile("")
    setFormData({
      "account": currentUser ? currentUser?.id : '',
      "image": currentUser ? currentUser?.profile : "",
      "name": currentUser ? currentUser?.firstname : "",
      "lastname": currentUser ? currentUser?.lastname : "",
      "email": currentUser ? currentUser?.email : "",
      "company": "",
      "feedback": "",
      "rating": 3
    })
  };

  if (submitted)
  {
    setTimeout(() =>
    {
      setSubmitted(false)
    }, 5000);
  }
  const onSelectImage = (event) =>
  {
    setFormData({ ...formData, image: event.target.files[0] });
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
  return (
    <>
      <style>{tailwindStyles}</style>
      <div className="widget fixed bottom-4 right-4 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <button className="rounded-full shadow-lg hover:scale-105">
              <MessageCircleIcon className="mr-2 h-5 w-5" />
              Feedback
            </button>
          </PopoverTrigger>
          <PopoverContent className="widget rounded-lg bg-card p-4 shadpw-lg w-full max-w-md">
            <style>{tailwindStyles}</style>
            {submitted ? (
              <div>
                <h3 className="text-lg font-bold">Thank you for your feedback!</h3>
                <p className="mt-4">
                  We appreciate your feedback. It helps us improve and provide better
                  service to you.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold">Send us your feedback</h3>
                <form
                  className="space-y-2"
                  onSubmit={submit}
                >
                  <div>
                    <div
                      className="relative flex flex-col justify-between items-center"
                    >
                      {(selectedFile || formData?.image) ? (
                        <>
                          <img
                            className="w-full max-h-[200px] object-cover"
                            src={currentUser?.id ? formData?.image : selectedFile}
                          />
                          {!currentUser?.id && (
                            <div className="absolute flex gap-3 top-1 right-1 bg-clr_alt rounded-full border-bg_grey">
                              <button
                                type="button"
                                className="p-2 rounded-full text-lg lg:text-xl"
                                onClick={() => setSelectedFile("")}
                              >
                                <MdClose />
                              </button>
                            </div>
                          )}
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name">Name</label>
                      <Input
                        value={formData.name}
                        id="name"
                        handleChange={handleChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="name">Last name</label>
                      <Input
                        value={formData.lastname}
                        id="lastname"
                        handleChange={handleChange}
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company">Company</label>
                      <Input
                        value={formData.company}
                        id="company"
                        handleChange={handleChange}
                        placeholder="Enter your work"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email">Email</label>
                      <Input
                        value={formData.email}
                        id="email"
                        handleChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="feedback">Feedback</label>
                    <Textarea
                      value={formData.feedback}
                      id="feedback"
                      handleChange={handleChange}
                      placeholder="Tell us what you think"
                      className="min-h-[70px]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`h-5 w-5 cursor-pointer ${formData?.rating > index ? "fill-clr_alt text-clr_alt" : "fill-muted stroke-muted-foreground"
                            }`}
                          onClick={() => onSelectStar(index)}
                        />
                      ))}
                    </div>
                    <button type="submit">Submit</button>
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

function StarIcon(props)
{
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

function MessageCircleIcon(props)
{
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-message-circle"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
