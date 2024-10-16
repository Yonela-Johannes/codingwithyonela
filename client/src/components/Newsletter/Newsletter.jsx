import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";
import { Head } from "../../shared/Head";
import { useSelector } from "react-redux";
import { apiUrl, formHeaders } from "../../constants/base_urls";
import { Spinner } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";

const Newsletter = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useSelector((state) => state?.user);
  const {
    currentUser: { firstname },
  } = useSelector((state) => state.user);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [loading, setLoading] = useState(false);

  console.log(currentUser)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email) {
      const formData = new FormData();
      formData.append("email", email);
      await axios
        .post(`${apiUrl}newsletter`, formData, {
          headers: formHeaders,
        })
        .then((_) => {4
          toast("Email sent, Thank you for subscribing to our newsletter! 🔥")
          setEmail(currentUser?.email || '')
          setLoading(false)
        })
        .catch(({ response }) => {
          if (response.status == 500) {
            toast("Something went wrong, please try again later.");
            setEmail(currentUser?.email || '')
            setLoading(false)
          }
        });
    }
  };

  return (
    <div className="max-w-[500px] space-y-2 py-14">
      <Head
        title="Subsribe to our Newsletter"
        desc="Stay in the loop with project updates, articles, and community news—straight to your inbox."
        theme={theme}
      />
      {firstname ? (
        <div>
          <p className="text-base lg:text-lg capitalize">{firstname} NewsLetter</p>
        </div>
      ) : (
        ""
      )}
      {/* form here */}
      <motion.form
        variants={SlideUp(0.6)}
        initial="initial"
        whileInView="animate"
        className="lg:!mt-10 flex"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => currentUser?.email ? "" : setValue(e.target.value)}
          placeholder="Enter your email"
          className={`${
            theme == "light" ? " text-bg_core" : ""
          } px-4 py-2 lg:py-4 w-full text-bg_core leading-tight focus:outline-none`}
        />
        <button
        type="submit"
          className={`${
            theme == "light"
              ? "bg-bg_core border-bg_grey"
              : "bg-bg_core border-bg_core"
          } px-6 py-4 uppercase text-white`}
          disabled={loading || email.length < 5}
        >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Subscribe"
            )}
        </button>
      </motion.form>
    </div>
  );
};

export default Newsletter;
