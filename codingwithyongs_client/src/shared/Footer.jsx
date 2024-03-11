import {
  FaFacebook,
  FaGithubAlt,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import HoverUnderLine from "../components/HoverUnderLine";

const Footer = () => {
  return (
    <div className="flex items-start gap-3 mt-2 flex-col md:flex-row justify-between py-2 overflow-x-hidden">
      <div className="flex flex-col gap-10  w-full">
        <h2 className="text-sm md:text-xl">
          Here I Share
          <br /> What I'm learning
        </h2>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <p className="text-base font-semibold">Company</p>
            <p className="text-base">Cape Town</p>
            <p className="text-base">South Africa</p>
            <div className="flex gap-1 mt-2">
              <p className="text-sm font-bold">Phone:</p>
              <p className="text-sm">069 356 4159</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm font-bold">Email:</p>
              <p className="text-sm">johannesyonela@gmail.com</p>
            </div>
          </div>
          <div>
            <p className="text-base font-semibold">About</p>
            <HoverUnderLine>
              <Link to="/about" className="text-base">
                About me
              </Link>
            </HoverUnderLine>
            <HoverUnderLine>
              <Link to="/blogs" className="text-base">
                Blogs
              </Link>
            </HoverUnderLine>
            <HoverUnderLine>
              <Link to="/testimonials" className="text-base">
                Testimonials
              </Link>
            </HoverUnderLine>
          </div>
          <div>
            <p className="text-base font-semibold">My Services</p>
            <p className="text-base">Web Development</p>
            <HoverUnderLine>
              <Link href="https://github.com/yonela-johannes" className="text-base">
                GitHub
              </Link>
            </HoverUnderLine>
            <HoverUnderLine>
              <Link href="https://" className="text-base">
                Portfolio
              </Link>
            </HoverUnderLine>
          </div>
        </div>

        <div className="flex gap-8 text-lg">
          <FaGithubAlt />
          <FaInstagramSquare />
          <FaLinkedin />
          <FaFacebook />
        </div>
      </div>
    </div>
  );
};

export default Footer;
