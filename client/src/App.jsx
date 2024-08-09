import Layout from "./shared/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateBlog from "./dashboard/components/blog/CreateBlog";
import About from "./pages/About";
import Collaboration from "./pages/Collaboration";
import Dashboard from "./dashboard/pages/Dashboard";
import ScrollToTop from './dashboard/components/ScrollToTop'
import Recommendations from "./pages/Recommenations";
import CreateProject from "./components/projects/CreateProject";
import Todopage from "./pages/Todopage";
import ProjectsTask from "./pages/ProjectsTask";
import Verify from "./pages/Verify";
import NotFoundPage from './pages/404'
import EditAccount from "./pages/EditAccount";
import Chill from "./components/chill/Chill";
import PrivateRoute from "./utils/PrivateRoute";
import AdminPrivateRoute from "./utils/AdminRoute";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

function App()
{

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/chill" element={<Chill />} />
            <Route path="/recommendation" element={<Recommendations />} />
            <Route path="/verify_account/:token" element={<Verify />} />
            <Route path="/about" element={<About />} />
            <Route path="/project-descussion" element={<Collaboration />} />
            <Route path="/project-status" element={<ProjectsTask />} />
            <Route path="/project/:id/todo" element={<Todopage />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/search" element={<Search />} />
            {/* user routes */}
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/edit-account" element={<PrivateRoute><EditAccount /></PrivateRoute>} />
            {/* admin routes */}

            <Route path="/create-blog" element={<AdminPrivateRoute><CreateBlog /></AdminPrivateRoute>} />
            <Route path="/project/add" element={<AdminPrivateRoute><CreateProject /></AdminPrivateRoute>} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
