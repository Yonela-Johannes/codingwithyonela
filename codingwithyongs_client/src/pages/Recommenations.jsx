import Header from "../components/blog/Header";
import RecommendationCard from "../components/recommendation/RecommendationCard";
import { Watermark } from "antd";

const Recommendations = () => {
  const colors = [
    "pink",
    "red",
    "yellow",
    "orange",
    "cyan",
    "green",
    "blue",
    "purple",
    "geekblue",
    "magenta",
    "volcano",
    "gold",
    "lime",
  ];

  const data = [
    {
      id: 22,
      title: "Freelancer",
      category: {
        name: "Software Development",
      },
      image:
        "https://avatars.githubusercontent.com/u/69614136?s=400&u=f564717fd69b29a6fb03caa0f22a908f6578f193&v=4",
      email: "johannesyonela@gail.com",
      name: "Yonela Yongs Johannes",
      address: "24 Jmp street",
      contactPerson: "069 415 6546",
      github: "yonela-johannes",
      linkedin: "yonela-johannes",
      portfolio: "https://github.com/yonela-johannes",
      instagram: "yonela-johannes",
      country: "South Africa",
      about:
        "I am a software developer with a passion for #code, #secure-coding, and #mentoring/coaching. In recent years, I have been coding, learning, and mentoring/assisting peers. As a software engineer, the more I gain knowledge, the more I understand there is so much more to learn.",
    },
    {
      id: 22,
      title: "Freelancer",
      category: {
        name: "Software Development",
      },
      image:
        "https://avatars.githubusercontent.com/u/69614136?s=400&u=f564717fd69b29a6fb03caa0f22a908f6578f193&v=4",
      email: "johannesyonela@gail.com",
      name: "Yonela Yongs Johannes",
      address: "24 Jmp street",
      contactPerson: "069 415 6546",
      github: "yonela-johannes",
      linkedin: "yonela-johannes",
      portfolio: "https://github.com/yonela-johannes",
      instagram: "yonela-johannes",
      country: "South Africa",
      about:
        "I am a software developer with a passion for #code, #secure-coding, and #mentoring/coaching. In recent years, I have been coding, learning, and mentoring/assisting peers. As a software engineer, the more I gain knowledge, the more I understand there is so much more to learn.",
    },
    {
      id: 22,
      title: "Freelancer",
      category: {
        name: "Software Development",
      },
      image:
        "https://avatars.githubusercontent.com/u/69614136?s=400&u=f564717fd69b29a6fb03caa0f22a908f6578f193&v=4",
      email: "johannesyonela@gail.com",
      name: "Yonela Yongs Johannes",
      address: "24 Jmp street",
      contactPerson: "069 415 6546",
      github: "yonela-johannes",
      linkedin: "yonela-johannes",
      portfolio: "https://github.com/yonela-johannes",
      instagram: "yonela-johannes",
      country: "South Africa",
      about:
        "I am a software developer with a passion for #code, #secure-coding, and #mentoring/coaching. In recent years, I have been coding, learning, and mentoring/assisting peers. As a software engineer, the more I gain knowledge, the more I understand there is so much more to learn.",
    },
    {
      id: 22,
      title: "Freelancer",
      category: {
        name: "Software Development",
      },
      image:
        "https://avatars.githubusercontent.com/u/69614136?s=400&u=f564717fd69b29a6fb03caa0f22a908f6578f193&v=4",
      email: "johannesyonela@gail.com",
      name: "Yonela Yongs Johannes",
      address: "24 Jmp street",
      contactPerson: "069 415 6546",
      github: "yonela-johannes",
      linkedin: "yonela-johannes",
      portfolio: "https://github.com/yonela-johannes",
      instagram: "yonela-johannes",
      country: "South Africa",
      about:
        "I am a software developer with a passion for #code, #secure-coding, and #mentoring/coaching. In recent years, I have been coding, learning, and mentoring/assisting peers. As a software engineer, the more I gain knowledge, the more I understand there is so much more to learn.",
    },
    {
      id: 22,
      title: "Freelancer",
      category: {
        name: "Software Development",
      },
      image:
        "https://avatars.githubusercontent.com/u/69614136?s=400&u=f564717fd69b29a6fb03caa0f22a908f6578f193&v=4",
      email: "johannesyonela@gail.com",
      name: "Yonela Yongs Johannes",
      address: "24 Jmp street",
      contactPerson: "069 415 6546",
      github: "yonela-johannes",
      linkedin: "yonela-johannes",
      portfolio: "https://github.com/yonela-johannes",
      instagram: "yonela-johannes",
      country: "South Africa",
      about:
        "I am a software developer with a passion for #code, #secure-coding, and #mentoring/coaching. In recent years, I have been coding, learning, and mentoring/assisting peers. As a software engineer, the more I gain knowledge, the more I understand there is so much more to learn.",
    },
    {
      id: 22,
      title: "Freelancer",
      category: {
        name: "Software Development",
      },
      image:
        "https://avatars.githubusercontent.com/u/69614136?s=400&u=f564717fd69b29a6fb03caa0f22a908f6578f193&v=4",
      email: "johannesyonela@gail.com",
      name: "Yonela Yongs Johannes",
      address: "24 Jmp street",
      contactPerson: "069 415 6546",
      github: "yonela-johannes",
      linkedin: "yonela-johannes",
      portfolio: "https://github.com/yonela-johannes",
      instagram: "yonela-johannes",
      country: "South Africa",
      about:
        "I am a software developer with a passion for #code, #secure-coding, and #mentoring/coaching. In recent years, I have been coding, learning, and mentoring/assisting peers. As a software engineer, the more I gain knowledge, the more I understand there is so much more to learn.",
    },
    {
      id: 22,
      title: "Freelancer",
      category: {
        name: "Software Development",
      },
      image:
        "https://avatars.githubusercontent.com/u/69614136?s=400&u=f564717fd69b29a6fb03caa0f22a908f6578f193&v=4",
      email: "johannesyonela@gail.com",
      name: "Yonela Yongs Johannes",
      address: "24 Jmp street",
      contactPerson: "069 415 6546",
      github: "yonela-johannes",
      linkedin: "yonela-johannes",
      portfolio: "https://github.com/yonela-johannes",
      instagram: "yonela-johannes",
      country: "South Africa",
      about:
        "I am a software developer with a passion for #code, #secure-coding, and #mentoring/coaching. In recent years, I have been coding, learning, and mentoring/assisting peers. As a software engineer, the more I gain knowledge, the more I understand there is so much more to learn.",
    },
    {
      id: 22,
      title: "Freelancer",
      category: {
        name: "Software Development",
      },
      image:
        "https://avatars.githubusercontent.com/u/69614136?s=400&u=f564717fd69b29a6fb03caa0f22a908f6578f193&v=4",
      email: "johannesyonela@gail.com",
      name: "Yonela Yongs Johannes",
      address: "24 Jmp street",
      github: "yonela-johannes",
      linkedin: "yonela-johannes",
      portfolio: "https://github.com/yonela-johannes",
      instagram: "yonela-johannes",
      country: "South Africa",
      about:
        "I am a software developer with a passion for #code, #secure-coding, and #mentoring/coaching. In recent years, I have been coding, learning, and mentoring/assisting peers. As a software engineer, the more I gain knowledge, the more I understand there is so much more to learn.",
    },
  ];

  return (
    <div className="flex flex-col gap-8 h-full my-5">
      <Header />
      <Watermark content="Coding W-Yongs">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4  gap-2 lg:grid-gap-4 xl:gap-6 h-full">
          {data?.map((item) => (
            <RecommendationCard item={item} key={item._id} colors={colors} />
          ))}
        </div>
      </Watermark>
    </div>
  );
};

export default Recommendations;
