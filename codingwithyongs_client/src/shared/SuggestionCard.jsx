import { useEffect, useState } from "react";
import Header from "../components/blog/Header";
import SuggestionCard from "../components/suggestion/SuggestionCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllSuggestions } from "../features/suggestions/suggestionSlice";
import { Button, Modal } from 'antd';

const SugggestionCard = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { suggestions, loading } = useSelector((state) => state.suggestion);

  console.log(suggestions);
  useEffect(() => {
    const fetchData = () => {
      const response = dispatch(getAllSuggestions());
      console.log(response);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        "loading"
      ) : loading == false && suggestions?.length == 0 ? (
        "No data"
      ) : suggestions?.length > 0 && loading == false ? (
        <div className="flex flex-col gap-8 h-full lg:px-10">
          <div className="grid grid-cols-1 overflow-hidden py-4 gap-6 h-full">
            {suggestions.map((suggestion) => (
              <SuggestionCard setOpen={setOpen} suggestion={suggestion} key={suggestion?.id} />
            ))}
          </div>
        </div>
      ) : (
        "No data"
      )}
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default SugggestionCard;
