import BlogCard from "../components/BlogCard"

const Blogs = () => {
  return (
    <div className="overflow-y-scroll bg-red-500 h-full">
        <header className="flex justify-between items-center">
            Blogs
            <div>
              <input placeholder='search' />
            </div>
        </header>
      <BlogCard />
    </div>
  )
}

export default Blogs
