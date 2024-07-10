import BlogCard from "../components/blog/BlogCard";
import Header from "../components/blog/Header";
import PostItem from "../components/blog/Post";
import Post from "../components/blog/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { useContext, useEffect, useState } from "react";
import { getAllCategories } from "../features/category/categorySlice";
import Loader from "../components/Loader/Loader";
import { ThemeContext } from "../context/ThemeContext";

const Blogs = () =>
{
  const { theme } = useContext(ThemeContext)
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);
  const [filterCat, setFilterCat] = useState("");
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const { categories, loading: load } = useSelector((state) => state.categories);
  const [journeyBlogs, setJourneyBlogs] = useState({});

  useEffect(() =>
  {
    const fetchData = () =>
    {
      dispatch(getAllBlogs());
    };
    fetchData();
  }, []);

  useEffect(() =>
  {
    const fetchData = () =>
    {
      dispatch(getAllCategories());
    };
    fetchData();
  }, []);

  useEffect(() =>
  {
    if (filterCat)
    {
      if (blogs && blogs?.length > 0)
      {
        const response = blogs.filter((elem) => elem.category == filterCat);
        setSelectedBlogs(response);
      }
    }
  }, [blogs, filterCat]);

  useEffect(() =>
  {
    if (blogs && blogs?.length > 0)
    {
      const response = blogs.filter(
        (elem) => elem?.category.toLowerCase() == "My quest".toLowerCase()
      );
      setJourneyBlogs(response);
    }
  }, [blogs]);

  return (
    <div className={`${theme == "light" ? "text-bg_opp" : "text-slate-400"} flex flex-col gap-8 h-full`}>
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
        <Loader />
      ) : categories?.length < 1 ? (
        ""
      ) : categories?.length > 0 ? (
        <Header setFilterCat={setFilterCat} categories={categories} />
      ) : (
        ""
      )}
      <div className="mb-10">
        <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-black">
          {filterCat ? filterCat : "Latest posts"}
        </h2>
        <>
          {loading ? (
            <Loader />
          ) : loading == false && blogs?.length == 0 ? (
            ""
          ) : blogs?.length > 0 && loading == false ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full mt-6">
              {filterCat && selectedBlogs?.length > 0
                ? blogs
                  .filter((blog) => blog.category == filterCat)
                  .map((blog) => <BlogCard blog={blog} key={blog.id} />)
                : blogs.map((blog) => <BlogCard blog={blog} key={blog.id} />)}
            </div>
          ) : (
            ""
          )}
        </>
      </div>
    </div>
  );
};

export default Blogs;
