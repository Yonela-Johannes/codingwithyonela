import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPost } from "../features/post/postSlice";
import Loader from "../components/Loader/Loader";

const PostDetails = () =>
{
  const navigate = useNavigate();
  const slug = useParams()?.slug;
  const { user } = useSelector((state) => state.user);
  const { posts, loading } = useSelector((state) => state.posts)
  const [isLoading, setIsloading] = useState(true)
  const dispatch = useDispatch()
  const [post, setPost] = useState()

  useEffect(() =>
  {
    setIsloading(true)
    if (slug)
    {
      setPost(posts?.find((post) => post.slug == slug))
    }
  }, [slug])

  useEffect(() =>
  {
    if (post && slug) setIsloading(false)
  }, [post])

  // const relatedPosts = userPosts?.documents.filter(
  //   (userPost) => userPost.$id !== id
  // );

  const handleDeletePost = () =>
  {
    // deletePost({ postId: id, imageId: post?.imageId });
    // navigate(-1);
  };

  return (
    <div className="max-w-7xl">
      <div className="hidden md:flex max-w-5xl w-full cursor-pointer">
        <div
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <p className="small-medium lg:base-medium">Back</p>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.image}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.account_id}`}
                className="flex items-center gap-3">
                <img
                  src={post?.profile}
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.username}{" "}{post?.lastname}
                  </p>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.post_id}`}
                  className={`${user?.id !== post?.account_id && "hidden"}`}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <div
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${user?.id !== post?.account_d && "hidden"
                    }`}>
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
            <div className="">
              {post?.video ? (
                <div>
                  <video width="320" height="240" controls>
                    <source src={post?.video} type="video/mp4" />
                  </video>
                </div>
              ) : ""}
            </div>
            <div>
              {post?.text ? (
                <p>{post?.text}</p>
              ) : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
