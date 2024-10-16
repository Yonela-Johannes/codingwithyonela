import { useContext } from "react";
import AboutMe from "../components/AboutMe";
import { ThemeContext } from "../context/ThemeContext";
import { Head } from "../shared/Head";

const About = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div
      >
        <Head title='About' desc='Discover the mission behind this platform and how it empowers collaboration and innovation.' theme={theme} />
      <div className={`lg:flex ${theme == "light" ? "text-cl_alt" : "text-bg_light"} h-full gap-8 items-start justify-start`}>
        <p className={`text-sm lg:text-base ${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} max-w-2xl`}>
          CodingWithYonela is a reflection of my journey as a developer, where being content means finding joy in the process and mastering the finer details of coding.
          <br />
          <br />
          My name is Yonela, and true to its meaning — "to be content"— I've built this space to track my projects, collaborate efficiently, and share knowledge with a like-minded community.
        </p>
        <AboutMe theme={theme} />
      </div>
    </div>
  );
};

export default About;
