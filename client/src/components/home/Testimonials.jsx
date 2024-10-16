import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import
  {
    disableFeedbackUpdates,
    getAllFeedback,
  } from "../../features/feedback/feedbackSlice";
import Loader from "../../shared/Loader";
import Card from "./testimonial/Card";
import { SlideUp } from "../../animation/animate";
import { Head } from "../../shared/Head";

const Testimonials = () =>
{
  const { theme } = useContext(ThemeContext);
  const { feedback, created, loading, updated } = useSelector(
    (state) => state.feedback
  );
  const dispatch = useDispatch();
  const { currentUser, signin_success, signup_success } = useSelector(
    (state) => state.user
  );

  const fetchFeedback = () =>
  {
    dispatch(getAllFeedback());
    dispatch(disableFeedbackUpdates());
  };

  useEffect(() =>
  {
    fetchFeedback();
  }, []);

  useEffect(() =>
  {
    if (signin_success || signup_success)
    {
      fetchFeedback();
    }
  }, [signin_success, signup_success]);

  useEffect(() =>
  {
    if (created || updated)
    {
      fetchFeedback();
    }
  }, [created, updated]);

  return loading ? (
    <Loader />
  ) : currentUser?.is_staff || currentUser?.is_admin ? (
    feedback?.length ? (
      <div className="mt-20">
        <div className="space-y-4 max-w-[550px] mb-8">
          <Head title='Our Friends(Testimonials)' desc='See what our community has to say about their experience collaborating and building with us.' theme={theme} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentUser?.is_staff || currentUser?.is_admin
            ? feedback?.map((element) => (
              <Card element={element} theme={theme} />
            ))
            : feedback?.map((element) =>
              element.status == "accepted" ? (
                <Card element={element} theme={theme} />
              ) : (
                ""
              )
            )}
        </div>
      </div>
    ) : (
      ""
    )
  ) : feedback?.length &&
    feedback?.find((element) => element.status == "accepted") ? (
    <div className="mt-10 lg:mt-20">
      <div className="space-y-4 max-w-[550px] mb-8">
        <motion.h1
          variants={SlideUp(0.2)}
          initial="initial"
          whileInView="animate"
          className="text-xl lg:text-4xl font-bold"
        >
          Our Friends
        </motion.h1>
        <motion.p
          variants={SlideUp(0.4)}
          initial="initial"
          whileInView="animate"
          className="text-gray-500 text-sm max-w-[350px]"
        >
          Bring your dream home to life with one-on-one design help & hand
          picked products
        </motion.p>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentUser?.is_staff || currentUser?.is_admin
          ? feedback?.map((element) => (
            <Card key={element?.id} element={element} theme={theme} />
          ))
          : feedback?.map((element) =>
            element.status == "accepted" ? (
              <Card key={element?.id} element={element} theme={theme} />
            ) : (
              ""
            )
          )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Testimonials;
