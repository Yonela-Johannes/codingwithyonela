import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import linkedin from "../assets/linkedInAds.png";
import HoverUnderLine from "../components/HoverUnderLine";

const Signin = () => {
  const loginNavigate = (url) => {
    window.location.href = url;
  };

  const linkedIn = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/linkedin/auth", {
        method: "GET",
      });
      const data = await response.json();
      loginNavigate(data.url);
    } catch (error) {
      console.error("Error during LinkedIn authentication:", error);
    }
  };

  return (
    <div className="flex items-center space-y-4 h-full">
      <div onClick={() => linkedIn()}>
        <AdOauthCard title="LinkedIn" icon={linkedin} />
      </div>
    </div>
  );
};

const AdOauthCard = ({ title, icon }) => {
  return (
    <div className="flex flex-col gap-4 rounded-sm shrink-0 items-start justify-center fill-fill backdrop-opacity-[17px]">
      <h1 className="text-center text-[30px] font-bold tracking-tight mb-8">
        Continue Signin to CodingWithYongs
      </h1>
      <div
        key={title}
        className="flex flex-col shrink-0 bg-table_bg items-start w-[250px] rounded-[12px] duration-300 cursor-pointer"
      >
        <HoverUnderLine>
          <div className="flex flex-grow gap-5">
            <div>
              <img
                src={icon}
                className="h-[40px] w-[40px] normal rounded-[50%]"
                alt={title}
              />
            </div>
            <div>
              <p className="text-black font-semibold text-[20px]">{title}</p>
              <p className="text-text font-semibold text-[15px]">
                Continue with LinkedIn
              </p>
            </div>
          </div>
        </HoverUnderLine>
      </div>
      <p className="my-5 text-[#646464] text-sm">
        By clicking “Continue your account with LinkedIn”, you agree <br /> to
        the CodingWithYongs <b>TOS</b> and <b>Privacy Policy</b>.
      </p>
    </div>
  );
};

export default Signin;
