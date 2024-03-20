import linkedin from "../assets/linkedInAds.png";
import HoverUnderLine from "../components/HoverUnderLine";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { siteUrl, apiUrl, callback } from "../constants/base_urls";

const Signin = () => {
  const { linkedInLogin } = useLinkedIn({
    clientId: "779t2vntfhhcna",
    scope: "profile email w_member_social",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: async (code) => {
      const response = await axios
        .post("http://localhost:8000/api/auth/linkedin", {
          code: code,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error.message));
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLoginSuccess = async (credentials) => {
    const response = await axios.post(`${apiUrl}user/login`, {
      oauthCode: credentials.credentials,
    });
    console.log(response);
  };

  return (
    <div className="flex items-center space-y-4 h-full">
      <div className="flex flex-col gap-4 rounded-sm shrink-0 items-start justify-center fill-fill backdrop-opacity-[17px]">
        <h1 className="text-center text-base lg:text-2xl lg:font-bold tracking-tight mb-8">
          Continue Signin to CodingWithYonela
        </h1>
        <div className="flex flex-col shrink-0 bg-table_bg items-start w-[250px] rounded-[12px] duration-300 cursor-pointer">
          <HoverUnderLine>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              login_uri={siteUrl}
              redirect_uri={callback}
              cancel_on_tap_outside
              useOneTap
              size="large"
              theme="filled_black"
              text="continue_with"
              shape="pill"
              width="100%"
            />
          </HoverUnderLine>
        </div>
        <p className="my-5 text-[#646464] text-sm">
          By clicking “Continue your account with Google”, you agree <br /> to
          the CodingWithYonela <b>TOS</b> and <b>Privacy Policy</b>.
        </p>
      </div>
    </div>
  );
};

const AdOauthCard = ({ title, icon }) => {
  return (
    <div className="flex flex-col gap-4 rounded-sm shrink-0 items-start justify-center fill-fill backdrop-opacity-[17px]">
      <h1 className="text-center text-[30px] font-bold tracking-tight mb-8">
        Continue Signin to CodingWithYonela
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
        the CodingWithYonela <b>TOS</b> and <b>Privacy Policy</b>.
      </p>
    </div>
  );
};

export default Signin;
