import React, { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import Loader from "../../shared/Loader";
import PostItem from "./PostItem";
import { useRouter } from "next/router";

const Posts = ({
  communityData,
  userId,
  loadingUser,
}) =>
{
  /**
   * PART OF INITIAL SOLUTION BEFORE CUSTOM HOOK
   */
  const [loading, setLoading] = useState(false);
  // const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Stack>
          {posts.map((post, index) => (
            <PostItem
              key={post.id}
              post={post}
              // postIdx={index}
              // onVote={onVote}
              // onDeletePost={onDeletePost}
              userVoteValue={
                postVotes.find((item) => item.postId === post.id)
                  ?.voteValue
              }
              userIsCreator={userId === post.creatorId}
              onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
