import { useState } from "react";
import { Input } from "../components/widget/input";
import { Textarea } from "../components/widget/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../components/widget/popover";
import tailwindStyles from "../index.css?inline";

export const Widget = () =>
{
  const [formData, setFormData] = useState({
    "name": "",
    "lastname": "",
    "email": "",
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
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  console.log(formData)
  const submit = async (e) =>
  {
    e.preventDefault();
    const data = {
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      feedback: formData.feedback,
      rating: formData.rating,
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
                  We appreciate your feedback. It helps us improve our product and provide better
                  service to our customers.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold">Send us your feedback</h3>
                <form
                  className="space-y-2"
                  onSubmit={submit}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name">Name</label>
                      <Input
                        id="name"
                        handleChange={handleChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="name">Last name</label>
                      <Input
                        id="lastname"
                        handleChange={handleChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email">Email</label>
                      <Input
                        id="email"
                        type="email"
                        handleChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="feedback">Feedback</label>
                    <Textarea
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
