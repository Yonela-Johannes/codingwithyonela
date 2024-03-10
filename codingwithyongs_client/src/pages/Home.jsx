import Top from "../components/blog/Top";

const Home = () => {
  return (
    <div className="h-full">
      <Top
        title="Hello, I'm"
        name="Yonela"
        description="Welcome to my website. Built using React, Tailwind, Flask,
        Python and Postgresql"
      />
      <p className="text-2xl">
        Welcome aboard our journey of exploration and growth, where we dive deep
        <br /> into the world of entrepreneurship, exchange ideas, and support
        each other
        <br /> in reaching our full potential—all while having a blast along the
        way!
      </p>
    </div>
  );
};

export default Home;
