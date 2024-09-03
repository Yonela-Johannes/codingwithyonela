import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import { useDispatch, useSelector } from "react-redux";
import { disableFeedbackUpdates, getAllFeedback } from "../../features/feedback/feedbackSlice";
import Loader from "../../shared/Loader";
import Card from "./testimonial/Card";

const Testimonials = () =>
{
  const { theme } = useContext(ThemeContext)
  const { feedback, created, loading, updated } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const { currentUser, signin_success, signup_success } = useSelector((state) => state.user)

  const fetchFeedback = () =>
  {
    dispatch(getAllFeedback());
    dispatch(disableFeedbackUpdates());
  }

  useEffect(() =>
  {
    fetchFeedback()
  }, []);

  useEffect(() =>
  {
    if (signin_success || signup_success)
    {
      fetchFeedback()
    }
  }, [signin_success, signup_success]);

  useEffect(() =>
  {

    if (created || updated)
    {
      fetchFeedback()
    }
  }, [created, updated]);

  return (
    loading ? (
      <Loader />
    ) : ((currentUser?.is_staff || currentUser?.is_admin) ?
      (
        feedback?.length ? (
          <div className="mt-20 tracking-wide">
            <span className="bg-bg_grey text-cl_primary rounded-full h-6 text-sm font-medium px-2 py-1">
              Feedback
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl tracking-wide mt-10 lg:mt-20">
              What People <span className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"}`}> are saying</span>
            </h2>
            <div className="flex flex-wrap h-full">
              {(currentUser?.is_staff || currentUser?.is_admin) ? (
                feedback?.map((element) => (
                  <Card element={element} theme={theme} />
                ))
              ) :
                (
                  feedback?.map((element) => (
                    element.status == 'accepted' ? (
                      <Card element={element} theme={theme} />
                    ) : ""
                  ))
                )}
            </div>
          </div>
        ) : ""
      ) : (
        feedback?.length && feedback?.find((element) => element.status == "accepted") ? (
          <div className="mt-20 tracking-wide">
            <span className="bg-bg_grey text-cl_primary rounded-full h-6 text-sm font-medium px-2 py-1">
              Feedback
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl tracking-wide mt-10 lg:mt-20">
              What People <span className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"}`}> are saying</span>
            </h2>
            <div className="flex flex-wrap h-full">
              {(currentUser.is_staff || currentUser?.is_admin) ? (
                feedback?.map((element) => (
                  <Card element={element} theme={theme} />
                ))
              ) :
                (
                  feedback?.map((element) => (
                    element.status == 'accepted' ? (
                      <Card element={element} theme={theme} />
                    ) : ""
                  ))
                )}
            </div>
          </div>
        )
          : ""
      )
    )
  )
};

export default Testimonials;
