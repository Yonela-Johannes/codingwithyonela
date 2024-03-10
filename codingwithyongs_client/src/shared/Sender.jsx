import { RiSendPlaneFill } from "react-icons/ri";

const Sender = () => {
  return (
    <div className="w-full px-10 md:my-4 z-10">
      <form className="flex bg-white border rounded-md border-bg_light">
        <select name="suggestion-categories">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <textarea
          rows="1"
          placeholder="Any ideas you want to share ?"
        />
        <button type="submit" className="border-none">
          <RiSendPlaneFill />
        </button>
      </form>
    </div>
  );
};

export default Sender;
