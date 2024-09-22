import React, { useContext } from "react";
import { Stack, Box, SkeletonText, Skeleton } from "@chakra-ui/react";
import { ThemeContext } from "../context/ThemeContext";

const Loader = ({ disable }) =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className="h-full my-5 w-full max-w-[800px] m-auto">
      <Stack spacing={6}>
        <Box padding="10px 10px" boxShadow="lg" bg={theme == 'light' ? "white" : "dark"} borderRadius={4}>
          <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          {!disable ? (
          <Skeleton mt="4" height="200px" />) : ""}
        </Box>
      </Stack>
    </div>
  );
};
export default Loader;
