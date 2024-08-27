import React from "react";
import { Stack, Box, SkeletonText, Skeleton } from "@chakra-ui/react";

const Loader = ({ disable }) =>
{
  return (
    <div className="h-full my-5 w-full max-w-[800px] m-auto">
      <Stack spacing={6}>
        <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
          <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <Skeleton mt="4" height="200px" />
        </Box>
        {!disable ? (
          <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
            <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <Skeleton mt="4" height="200px" />
          </Box>
        ) : ""}
      </Stack>
    </div>
  );
};
export default Loader;