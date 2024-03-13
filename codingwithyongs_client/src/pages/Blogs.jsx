import BlogCard from "../components/blog/BlogCard";
import Header from "../components/blog/Header";
import { Watermark } from "antd";
import Top from "../components/blog/Top";
import { sortPosts } from "../lib/utils";
import PostItem from "../components/blog/Post";
import Post from "../components/blog/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { useEffect, useState } from "react";
import { getAllCategories } from "../features/category/categorySlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);
  const [filterCat, setFilterCat] = useState("");
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const { categories, loading: load } = useSelector(
    (state) => state.categories
  );
  const [journeyBlogs, setJourneyBlogs] = useState({});

  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllBlogs());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllCategories());
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (filterCat) {
      if (blogs && blogs?.length > 0) {
        const response = blogs.filter((elem) => elem.category == filterCat);
        setSelectedBlogs(response);
      }
    }
  }, [blogs, filterCat]);

  useEffect(() => {
    if (blogs && blogs?.length > 0) {
      const response = blogs.filter(
        (elem) => elem?.category.toLowerCase() == "My quest".toLowerCase()
      );
      setJourneyBlogs(response);
    }
  }, [blogs]);

  return (
    <div className="flex flex-col gap-8 h-full">
      <Top
        title="Hello, I'm"
        name="Yonela"
        description="Welcome to my blog website. Built using React, Tailwind, Flask,
            Python and Postgresql"
      />
      <Watermark content="Coding W-Yongs">
        {/* <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-black">
          Featured Posts
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full mt-6">
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </div> */}
      </Watermark>
      {journeyBlogs && journeyBlogs?.length > 0 ? (
        <section className="max-w-4xl py-2 lg:py-4 flex flex-col space-y-6 mt-4">
          <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-black">
            My Quest
          </h2>
          <ul className="flex flex-col">
            {journeyBlogs.map((post) => (
              <li
                key={post?.slug}
                className="first:border-t first:border-border"
              >
                <Post
                  slug={post?.slug}
                  title={post?.blog_title}
                  description={post?.post}
                  date={post?.blog_time}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        ""
      )}
      {load ? (
        "loading"
      ) : load == false && categories?.length == 0 ? (
        "No data"
      ) : categories?.length > 0 && load == false ? (
        <Header setFilterCat={setFilterCat} categories={categories} />
      ) : (
        "No data"
      )}
      <Watermark content="Coding W-Yongs mb-10">
        <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-black">
          {filterCat ? filterCat : "Latest posts"}
        </h2>
        <>
          {loading ? (
            "loading"
          ) : loading == false && blogs?.length == 0 ? (
            "No data"
          ) : blogs?.length > 0 && loading == false ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full mt-6">
              {filterCat && selectedBlogs?.length > 0
                ? blogs
                    .filter((blog) => blog.category == filterCat)
                    .map((blog) => <BlogCard blog={blog} key={blog.id} />)
                : blogs.map((blog) => <BlogCard blog={blog} key={blog.id} />)}
            </div>
          ) : (
            "No data"
          )}
        </>
      </Watermark>
    </div>
  );
};

export default Blogs;
