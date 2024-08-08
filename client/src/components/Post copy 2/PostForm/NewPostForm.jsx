import React, { useEffect, useRef, useState } from "react";
import
{
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Stack,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";
import ImageUpload from "./ImageUpload";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];


const NewPostForm = ({ }) =>
{
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  const selectFileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreatePost = async () =>
  {
    setLoading(true);
  };

  const onSelectImage = (event) =>
  {
    const reader = new FileReader();
    if (event.target.files?.[0])
    {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) =>
    {
      if (readerEvent.target?.result)
      {
        setSelectedFile(readerEvent.target?.result);
      }
    };
  };

  const onTextChange = ({
    target: { name, value },
  }) =>
  {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <TabItem
            key={index}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectImage}
          />
        )}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
