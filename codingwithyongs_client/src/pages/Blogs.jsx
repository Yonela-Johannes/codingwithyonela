import BlogCard from "../components/blog/BlogCard"
import Header from "../components/blog/Header"

const Blogs = () => {
  return (
    <div className="overflow-y-scroll bg-red-500 h-full">
      <Header />
      <BlogCard />
    </div>
  )
}

export default Blogs
