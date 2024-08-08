import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/Post copy/PostItem/PostCard';
import { ThemeContext } from '../context/ThemeContext';

export default function Search()
{
  const { theme } = useContext(ThemeContext)
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() =>
  {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl)
    {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () =>
    {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok)
      {
        setLoading(false);
        return;
      }
      if (res.ok)
      {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9)
        {
          setShowMore(true);
        } else
        {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) =>
  {
    if (e.target.id === 'searchTerm')
    {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort')
    {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category')
    {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () =>
  {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok)
    {
      return;
    }
    if (res.ok)
    {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9)
      {
        setShowMore(true);
      } else
      {
        setShowMore(false);
      }
    }
  };

  return (
    <div className={`${theme == "light" ? "text-black" : "text-white"} flex flex-col md:flex-row`}>
      <div className='p-7 h-full'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-bg_light" : "bg-bg_grey text-white"} rounded-sm`}
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select onChange={handleChange} value={sidebarData.sort} id='sort'
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-bg_light" : "bg-bg_grey text-white"} rounded-sm`}
            >
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-bg_light" : "bg-bg_grey text-white"} rounded-sm`}
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
              <option value='javascript'>JavaScript</option>
            </select>
          </div>
          <button type='submit'
            className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold text-white ${theme == "light" ? "bg-clr_alt" : "bg-clr_alt"}`}

          >
            Apply Filters
          </button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold  p-3 mt-5 '>
          Search results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>Nothing found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold text-white ${theme == "light" ? "bg-clr_alt" : "bg-clr_alt"}}`}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
