import AboutMe from "../components/AboutMe";

const About = () => {
  return (
    <div className="h-full space-y-8">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-xl lg:text-3xl">
            About Me
          </h1>
        </div>
      </div>
      <p>
        Welcome to my hub! <strong>I'm Yonela Johannes</strong>, a{" "}
        <em>self-taught software developer</em> and{" "}
        <em>entrepreneurial enthusiast</em>
        <br /> who believes in the power of continuous learning and growth.{" "}
        <strong>My ultimate goal? To build my own tech company</strong>
        <br /> and contribute valuable services to the world. As I embark on
        this journey, I'm eager for guidance and advice
        <br /> from those who see the path ahead and can offer insights on what
        I need to learn or do to reach my destination. <br /> If you're as
        driven and motivated as I am, or even more so,{" "}
        <strong>let's join forces and walk this path together</strong>, learning
        <br /> and growing from each other along the way.
        <br />
        <br /> Thank you for visiting, friend.
        <br /> Let's make great things happen together.
        <br /> <br />
        <strong>Yours in ambition,</strong> <br />
        Yonela Johannes
      </p>
      <AboutMe />
    </div>
  );
};

export default About;
