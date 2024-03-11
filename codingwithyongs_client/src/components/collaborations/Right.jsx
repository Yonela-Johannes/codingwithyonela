import clipper from "../../assets/png-transparent-paper-scroll-paper-miscellaneous-presentation-parchment-thumbnail.png";
import Chat from "./Chat";
import MessageInput from "../../shared/MessageInput";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

const Right = () => {
  const [active, setActive] = useState(false);
  const messages = [
    {
      date: Date.now(),
      user: {
        title: "Software engineer",
        name: "Yonela Johannes",
        image:
          "https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1715212800&v=beta&t=-sdMAxX9JqkcUf08GWyBHVk51OZiEb9FR-MTTgUaLa8",
      },
      message: "Create engaging social media content for new product launch.",
    },
    {
      date: Date.now(),
      user: {
        title: "QA tester",
        name: "Okuhle Tapuko",
        image:
          "https://media.licdn.com/dms/image/D4D03AQE7EEI5VCW16A/profile-displayphoto-shrink_800_800/0/1677660257671?e=1715212800&v=beta&t=SM1Vqkbf6WJN10pjvc9UIU2u00xvRbleC2rJEAIDaCE",
      },
      message: "Create engaging social media content for new product launch.",
    },
    {
      date: Date.now(),
      user: {
        title: "Software engineer",
        name: "Yonela Johannes",
        image:
          "https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1715212800&v=beta&t=-sdMAxX9JqkcUf08GWyBHVk51OZiEb9FR-MTTgUaLa8",
      },
      message: "Create engaging social media content for new product launch.",
    },
    {
      date: Date.now(),
      user: {
        title: "QA tester",
        name: "Okuhle Tapuko",
        image:
          "https://media.licdn.com/dms/image/D4D03AQE7EEI5VCW16A/profile-displayphoto-shrink_800_800/0/1677660257671?e=1715212800&v=beta&t=SM1Vqkbf6WJN10pjvc9UIU2u00xvRbleC2rJEAIDaCE",
      },
      message: "Create engaging social media content for new product launch.",
    },
    {
      date: Date.now(),
      user: {
        title: "Software engineer",
        name: "Yonela Johannes",
        image:
          "https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1715212800&v=beta&t=-sdMAxX9JqkcUf08GWyBHVk51OZiEb9FR-MTTgUaLa8",
      },
      message: "Create engaging social media content for new product launch.",
    },
    {
      date: Date.now(),
      user: {
        title: "QA tester",
        name: "Okuhle Tapuko",
        image:
          "https://media.licdn.com/dms/image/D4D03AQE7EEI5VCW16A/profile-displayphoto-shrink_800_800/0/1677660257671?e=1715212800&v=beta&t=SM1Vqkbf6WJN10pjvc9UIU2u00xvRbleC2rJEAIDaCE",
      },
      message: "Create engaging social media content for new product launch.",
    },
    {
      date: Date.now(),
      user: {
        title: "QA tester",
        name: "Okuhle Tapuko",
        image:
          "https://media.licdn.com/dms/image/D4D03AQE7EEI5VCW16A/profile-displayphoto-shrink_800_800/0/1677660257671?e=1715212800&v=beta&t=SM1Vqkbf6WJN10pjvc9UIU2u00xvRbleC2rJEAIDaCE",
      },
      message: "Create engaging social media content for new product launch.",
    },
    {
      date: Date.now(),
      user: {
        title: "Software engineer",
        name: "Yonela Johannes",
        image:
          "https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1715212800&v=beta&t=-sdMAxX9JqkcUf08GWyBHVk51OZiEb9FR-MTTgUaLa8",
      },
      message: "Create engaging social media content for new product launch.",
    },
    {
      date: Date.now(),
      user: {
        title: "QA tester",
        name: "Okuhle Tapuko",
        image:
          "https://media.licdn.com/dms/image/D4D03AQE7EEI5VCW16A/profile-displayphoto-shrink_800_800/0/1677660257671?e=1715212800&v=beta&t=SM1Vqkbf6WJN10pjvc9UIU2u00xvRbleC2rJEAIDaCE",
      },
      message: "Create engaging social media content for new product launch.",
    },
  ];
  return (
    <div className="flex flex-col rounded-md relative gap-10 h-full  pt-3 pb-1">
      <div className="hidden lg:block absolute -mt-5 p-0 m-0 top-0  w-full h-full">
        <img src={clipper} className="w-full h-full object-contain" />
      </div>
      <div className="z-20 h-[580px] overflow-y-scroll space-y-4">
        {messages?.map((message, i) => (
          <Chat key={i} message={message} />
        ))}
      </div>
      <div className="flex items-end  justify-end absolute bottom-10 w-full px-10 z-40">
        {active ? (
          <MessageInput setActive={setActive} />
        ) : (
          <div
            onClick={() => setActive(!active)}
            className="cursor-pointer text-white  bg-clr_alt items-end p-2 rounded-full"
          >
            <MdModeEdit size={22} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Right;
